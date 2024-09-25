import { getDatabase } from "../dbManager";
import * as schema from "../schema";
import { sql, eq, like, and } from "drizzle-orm";

export const productOperations = {
  getProducts: async (limit: number, offset: number, filters: any) => {
    const db = getDatabase();

    let query = db
      .select()
      .from(schema.product)
      .leftJoin(
        schema.category,
        eq(schema.product.categoryId, schema.category.id)
      );

    const whereConditions = [];

    if (filters.categoryId) {
      whereConditions.push(eq(schema.product.categoryId, filters.categoryId));
    }

    if (filters.searchQuery) {
      whereConditions.push(
        like(schema.product.name, `%${filters.searchQuery}%`)
      );
    }

    if (whereConditions.length > 0) {
      query = query.where(and(...whereConditions));
    }

    const products = await query.limit(limit).offset(offset).execute();

    const [countResult] = await db
      .select({ count: sql`count(*)` })
      .from(schema.product)
      .execute();

    return {
      products: products.map(formatProductData),
      total: Number(countResult.count),
    };
  },

  getProductById: async (productId: number) => {
    const db = getDatabase();
    try {
      const [product] = await db
        .select()
        .from(schema.product)
        .where(eq(schema.product.id, productId))
        .execute();

      if (!product) return null;

      const attributes = product.attribute
        ? await db
            .select()
            .from(schema.productAttribute)
            .where(eq(schema.productAttribute.id, product.attribute))
            .execute()
        : [];

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
    return await db.select().from(schema.category).execute();
  },
};
// Helper function
function formatProductData(item: any) {
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
}
