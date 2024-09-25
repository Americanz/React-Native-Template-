// app/data/mockOrders.ts
import { OrderItem, mockOrderItems } from "./mockOrderItems";

export interface Order {
  id: number;
  date: string;
  status: "pending" | "processing" | "completed" | "cancelled";
  customerName: string;
  total: number;
  items: OrderItem[];
}

function getRandomItems(): OrderItem[] {
  const numItems = Math.floor(Math.random() * 5) + 1; // 1-5 товарів
  const items: OrderItem[] = [];
  for (let i = 0; i < numItems; i++) {
    const randomItem =
      mockOrderItems[Math.floor(Math.random() * mockOrderItems.length)];
    items.push({ ...randomItem, quantity: Math.floor(Math.random() * 3) + 1 }); // 1-3 кількість
  }
  return items;
}

function calculateTotal(items: OrderItem[]): number {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

export const mockOrders: Order[] = [
  {
    id: 1,
    date: "2024-09-21",
    status: "pending",
    customerName: "John Doe",
    items: getRandomItems(),
    get total() {
      return calculateTotal(this.items);
    },
  },
  {
    id: 2,
    date: "2024-09-21",
    status: "processing",
    customerName: "Jane Smith",
    items: getRandomItems(),
    get total() {
      return calculateTotal(this.items);
    },
  },
  {
    id: 3,
    date: "2024-09-20",
    status: "completed",
    customerName: "Bob Johnson",
    items: getRandomItems(),
    get total() {
      return calculateTotal(this.items);
    },
  },
  {
    id: 4,
    date: "2024-09-20",
    status: "cancelled",
    customerName: "Alice Brown",
    items: getRandomItems(),
    get total() {
      return calculateTotal(this.items);
    },
  },
  {
    id: 5,
    date: "2024-09-19",
    status: "pending",
    customerName: "Charlie Davis",
    items: getRandomItems(),
    get total() {
      return calculateTotal(this.items);
    },
  },
  {
    id: 6,
    date: "2024-09-19",
    status: "processing",
    customerName: "Eva Wilson",
    items: getRandomItems(),
    get total() {
      return calculateTotal(this.items);
    },
  },
  {
    id: 7,
    date: "2024-09-18",
    status: "completed",
    customerName: "Frank Miller",
    items: getRandomItems(),
    get total() {
      return calculateTotal(this.items);
    },
  },
  {
    id: 8,
    date: "2024-09-18",
    status: "cancelled",
    customerName: "Grace Taylor",
    items: getRandomItems(),
    get total() {
      return calculateTotal(this.items);
    },
  },
  {
    id: 9,
    date: "2024-09-18",
    status: "completed",
    customerName: "Frank Miller",
    items: getRandomItems(),
    get total() {
      return calculateTotal(this.items);
    },
  },
  {
    id: 10,
    date: "2024-09-18",
    status: "cancelled",
    customerName: "Grace Taylor",
    items: getRandomItems(),
    get total() {
      return calculateTotal(this.items);
    },
  },
  {
    id: 11,
    date: "2024-09-18",
    status: "completed",
    customerName: "Frank Miller",
    items: getRandomItems(),
    get total() {
      return calculateTotal(this.items);
    },
  },
  {
    id: 12,
    date: "2024-09-18",
    status: "cancelled",
    customerName: "Grace Taylor",
    items: getRandomItems(),
    get total() {
      return calculateTotal(this.items);
    },
  },
  {
    id: 13,
    date: "2024-09-18",
    status: "completed",
    customerName: "Frank Miller",
    items: getRandomItems(),
    get total() {
      return calculateTotal(this.items);
    },
  },
  {
    id: 14,
    date: "2024-09-18",
    status: "cancelled",
    customerName: "Grace Taylor",
    items: getRandomItems(),
    get total() {
      return calculateTotal(this.items);
    },
  },
  {
    id: 15,
    date: "2024-09-18",
    status: "completed",
    customerName: "Frank Miller",
    items: getRandomItems(),
    get total() {
      return calculateTotal(this.items);
    },
  },
  {
    id: 16,
    date: "2024-09-18",
    status: "cancelled",
    customerName: "Grace Taylor",
    items: getRandomItems(),
    get total() {
      return calculateTotal(this.items);
    },
  },
];
