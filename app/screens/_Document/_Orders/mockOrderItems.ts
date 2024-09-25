// app/data/mockOrderItems.ts

export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export const mockOrderItems: OrderItem[] = [
  { id: 1, name: "Product 1", quantity: 2, price: 10.99, image: "" },
  { id: 2, name: "Product 2", quantity: 1, price: 24.99, image: "" },
  { id: 3, name: "Product 3", quantity: 3, price: 5.99, image: "" },
  { id: 4, name: "Product 4", quantity: 1, price: 15.5, image: "" },
  { id: 5, name: "Product 5", quantity: 2, price: 8.75, image: "" },
  { id: 6, name: "Product 6", quantity: 4, price: 3.99, image: "" },
  { id: 7, name: "Product 7", quantity: 1, price: 49.99, image: "" },
  { id: 8, name: "Product 8", quantity: 2, price: 12.5, image: "" },
];
