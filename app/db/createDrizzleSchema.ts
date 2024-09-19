import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { Models, AnyModel } from "../types";

function getPropertyType(property: any): any {
  switch (property.name) {
    case "string":
      return text;
    case "number":
      return integer;
    case "boolean":
      return integer; // SQLite doesn't have a native boolean type, so we use integer
    case "identifierNumber":
      return integer;
    case "Date":
      return text; // Dates can be stored as text in ISO format
    case "late":
      return integer; // For foreign keys, you might want to improve this
    case "array":
      return text; // Arrays can be stored as JSON strings
    default:
      return text; // Default to text for unknown types
  }
}

function createTableFromModel(model: AnyModel, tableName: string) {
  const tableDefinition: Record<string, any> = {};

  Object.entries(model.properties).forEach(([key, value]) => {
    const columnType = getPropertyType(value);

    if (key === "id") {
      tableDefinition[key] = integer(key).primaryKey();
    } else if (value.isOptional) {
      tableDefinition[key] = columnType(key);
    } else {
      tableDefinition[key] = columnType(key).notNull();
    }
  });

  return sqliteTable(tableName, tableDefinition);
}

export function createDrizzleSchema() {
  const schema: Record<string, ReturnType<typeof sqliteTable>> = {};

  Object.entries(Models).forEach(([name, model]) => {
    schema[name.toLowerCase()] = createTableFromModel(model, name);
  });

  return schema;
}

// Helper function to ensure type safety
function ensureType<T>(value: T): T {
  return value;
}

// Usage example:
const schema = ensureType(createDrizzleSchema());
export const { product, category, productAttribute } = schema;

// New models will be automatically included

// Наприклад, якщо ви додасте нову модель OrderModel, процес буде таким:
// // У productTypes.ts
// export const OrderModel = types.model("Order", {
//   id: types.number,
//   orderDate: types.Date,
//   totalAmount: types.number,
//   // ... інші поля
// });

// // У функції createDrizzleSchema
// const models: Record<string, ModelType> = {
//   Product: ProductModel,
//   Category: CategoryModel,
//   ProductAttribute: ProductAttributeModel,
//   Order: OrderModel, // Додано нову модель
// };

// // В кінці файлу
// export const { product, category, productAttribute, order } = schema;
