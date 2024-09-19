// db/productDb.ts
import { getDatabase } from "./dataManager";
import { product } from "./schema";
import { eq } from "drizzle-orm";

export const productDbOperations = {
  async getProducts(
    limit: number,
    offset: number,
    selectedCategoryId: number | null = null
  ) {
    const db = await getDatabase();
    let query = db.select().from(product).limit(limit).offset(offset);

    if (selectedCategoryId) {
      query = query.where(eq(product.categoryId, selectedCategoryId));
    }

    const products = await query.all();

    // Якщо `attribute` зберігається як JSON-рядок у базі даних
    return products.map((productItem) => ({
      ...productItem,
      attribute: productItem.attribute
        ? JSON.parse(productItem.attribute as string)
        : [],
    }));
  },

  async getProductById(productId: number) {
    const db = await getDatabase();
    const [productItem] = await db
      .select()
      .from(product)
      .where(eq(product.id, productId))
      .all();

    if (productItem) {
      return {
        ...productItem,
        attribute: productItem.attribute
          ? JSON.parse(productItem.attribute as string)
          : [],
      };
    } else {
      return null;
    }
  },

  async getProductsCount(
    selectedCategoryId: number | null = null
  ): Promise<number> {
    const db = await getDatabase();
    let query = db.select({ count: db.fn.count(product.id) }).from(product);

    if (selectedCategoryId) {
      query = query.where(eq(product.categoryId, selectedCategoryId));
    }

    const result = await query.get();
    return result.count ?? 0;
  },
};
