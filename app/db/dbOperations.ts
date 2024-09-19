import { getDatabase } from "../db/dataManager";
import * as schema from "./schema";
import { sql, eq, desc } from "drizzle-orm";
// import { Product, Category, ProductAttribute } from "../types/product";

// Product = schema.Product
type Product = typeof schema.product.$inferSelect;
type Category = typeof schema.category.$inferSelect;
type ProductAttribute = typeof schema.productAttribute.$inferSelect;

const mapApiDataToDbSchema = (
  apiData: Record<string, any>,
  dbSchema: Record<string, any>
) => {
  const mappedData: Record<string, any> = {};
  for (const field in dbSchema) {
    if (apiData[field] !== undefined) {
      mappedData[field] = apiData[field];
    }
  }
  return mappedData;
};

export const dbOperations = {
  getProducts: async (limit: number, offset: number) => {
    const db = getDatabase();


    const products = await db
      .select()
      .from(schema.product)
      .leftJoin(
        schema.category,
        eq(schema.product.categoryId, schema.category.id)
      )
      .limit(limit)
      .offset(offset);

    const [countResult] = await db
      .select({ count: sql`count(*)` })
      .from(schema.product);

    const formattedProducts = products.map((item) => {
      const product = item.Product;
      let parsedAttribute = null;
      if (product.attribute) {
        try {
          parsedAttribute = JSON.parse(product.attribute as string);
        } catch (error) {
          console.error(
            `Error parsing attribute for product ${product.id}:`,
            error
          );
          console.log("Raw attribute value:", product.attribute);
        }
      }

      return {
        ...product,
        attribute: parsedAttribute,
        category: item.Category
          ? {
              id: item.Category.id,
              name: item.Category.name,
              description: item.Category.description,
            }
          : null,
      };
    });

    return {
      products: formattedProducts,
      total: Number(countResult.count),
    };
  },

  getProductById: async (
    productId: number
  ): Promise<(Product & { attribute: ProductAttribute[] | null }) | null> => {
    const db = getDatabase();
    try {
      const [product] = await db
        .select()
        .from(schema.product)
        .where(eq(schema.product.id, productId));

      if (!product) {
        console.log(`Product with id ${productId} not found`);
        return null;
      }

      let attributes: ProductAttribute[] = [];
      if (product.attribute) {
        attributes = await db
          .select()
          .from(schema.productAttribute)
          .where(eq(schema.productAttribute.id, product.attribute));
      }

      return {
        ...product,
        attribute: attributes.length > 0 ? attributes : null,
      };
    } catch (error) {
      console.error("Error in getProductById:", error);
      throw error;
    }
  },

  getCategories: async () => {
    const db = getDatabase();
    return await db.select().from(schema.category);
  },

  async getLastSyncTime(
    entityType: "product" | "category"
  ): Promise<string | null> {
    const db = getDatabase();
    const [result] = await db
      .select({ syncEndTime: schema.syncLog.syncEndTime })
      .from(schema.syncLog)
      .where(eq(schema.syncLog.entityType, entityType))
      .orderBy(desc(schema.syncLog.syncEndTime))
      .limit(1);

    return result?.syncEndTime || null;
  },

  async logSync(syncData: {
    entityType: "product" | "category";
    syncStartTime: string;
    syncEndTime: string;
    itemsSynced: number;
    status: "success" | "failed";
    errorMessage?: string;
  }): Promise<void> {
    const db = getDatabase();
    await db.insert(schema.syncLog).values(syncData);
  },

  async getSyncStats(
    entityType: "product" | "category",
    limit: number = 10
  ): Promise<any[]> {
    const db = getDatabase();
    return db
      .select()
      .from(schema.syncLog)
      .where(eq(schema.syncLog.entityType, entityType))
      .orderBy(desc(schema.syncLog.syncEndTime))
      .limit(limit);
  },

  async upsertProduct(product: Product[]): Promise<void> {
    const db = getDatabase();
    try {
      const existingProduct = await db
        .select()
        .from(schema.product)
        .where(eq(schema.product.id, product.id))
        .execute();
      if (existingProduct.length > 0) {
        await db
          .update(schema.product)
          .set(product)
          .where(eq(schema.product.id, product.id))
          .execute();
        console.log(`Product with ID ${product.id} updated successfully`);
      } else {
        await db.insert(schema.product).values(product).execute();
        console.log(`New product with ID ${product.id} inserted successfully`);
      }
    } catch (error) {
      console.error("Error during product upsert:", error);
      throw error;
    }
  },

  async upsertSingleProduct(productData: Product): Promise<void> {
    const db = getDatabase();

    const productExists = async (productId: number) => {
      const result = await db
        .select()
        .from(schema.product)
        .where(eq(schema.product.id, productId));
      return result.length > 0;
    };

    try {
      // const exists = await productExists(productData.id);

      const mappedProduct = mapApiDataToDbSchema(productData, schema.product);

      if (productData.attribute) {
        mappedProduct.attribute = JSON.stringify(productData.attribute);
      }

      await db
        .insert(schema.product)
        .values({
          ...mappedProduct,
          id: mappedProduct.id,
        })
        .onConflictDoUpdate({
          target: schema.product.id,
          set: mappedProduct,
        });

      // await db.insert(schema.product).values(mappedProduct);
      console.log(`Product ${mappedProduct.id} upsert successfully`);
    } catch (error) {
      console.error(`Error upserting product ${productData.id}:`, error);
      throw error;
    }
  },

  async batchUpsertProducts(products: Product[]): Promise<void> {
    const db = getDatabase();
    const batchSize = 100;

    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize);

      await db.transaction(async (tx) => {
        const queries = batch.map((product) => {
          type ProductUpdateFields = Omit<Product, "id" | "createdAt">;
          const updateFields: ProductUpdateFields = { ...product };

          return tx
            .insert(schema.product)
            .values(product)
            .onConflictDoUpdate({
              target: schema.product.id,
              set: {
                ...updateFields,
                updatedAt: sql`CURRENT_TIMESTAMP`,
              },
            });
        });

        await Promise.all(queries);
      });

      console.log(`Processed batch ${i / batchSize + 1}`);
    }

    console.log(`Batch upsert completed for ${products.length} products`);
  },

  async upsertCategory(category: Category): Promise<void> {
    const db = getDatabase();
    const mappedCategory = mapApiDataToDbSchema(category, schema.product);

    await db
      .insert(schema.category)
      .values({
        ...mappedCategory,
        id: mappedCategory.id,
      })
      .onConflictDoUpdate({
        target: schema.category.id,
        set: mappedCategory,
      });

    console.log(`Category ${mappedCategory.name} upsert successfully`);

    // await db.insert(schema.category).values(mappedCategory).onConflictDoUpdate({
    //   target: schema.category.id,
    //   set: mappedCategory,
    // });
  },

  checkDatabaseStructure: async () => {
    const db = getDatabase();
    try {
      const tables = await db.query(
        "SELECT name FROM sqlite_master WHERE type='table';"
      );
      console.log("Database tables:", tables);

      for (const table of tables) {
        const columns = await db.query(`PRAGMA table_info(${table.name});`);
        console.log(`Structure of table ${table.name}:`, columns);
      }
    } catch (error) {
      console.error("Error checking database structure:", error);
    }
  },
};
