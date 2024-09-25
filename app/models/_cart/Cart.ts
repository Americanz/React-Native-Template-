import { types, Instance, getRoot } from "mobx-state-tree";
import { ProductModel } from "app/types/productTypes";

const CartItemModel = types
  .model("CartItem", {
    productId: types.identifierNumber,
    quantity: types.number,
  })
  .views((self) => ({
    get product() {
      const rootStore = getRoot(self);
      return rootStore.productStore.products.find(
        (p) => p.id === self.productId
      );
    },
  }));

export const CartModel = types
  .model("Cart", {
    items: types.array(CartItemModel),
  })
  .views((self) => ({
    get totalItems() {
      return self.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    get totalPrice() {
      return self.items.reduce((sum, item) => {
        const price = item.product?.attribute.find(
          (attr) => attr.alias === "price"
        );
        return sum + (price ? Number(price.value) : 0) * item.quantity;
      }, 0);
    },
    getItemQuantity(productId: number) {
      const item = self.items.find((item) => item.productId === productId);
      return item ? item.quantity : 0;
    },
  }))
  .actions((self) => ({
    addItem(productId: number) {
      const existingItem = self.items.find(
        (item) => item.productId === productId
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        self.items.push({ productId: productId, quantity: 1 });
      }
    },
    removeItem(productId: number) {
      const index = self.items.findIndex(
        (item) => item.productId === productId
      );
      if (index !== -1) {
        self.items.splice(index, 1);
      }
    },
    updateItemQuantity(productId: number, quantity: number) {
      const item = self.items.find((item) => item.productId === productId);
      if (item) {
        item.quantity = Math.max(0, quantity);
        if (item.quantity === 0) {
          this.removeItem(productId);
        }
      }
    },
    clearCart() {
      self.items.clear();
    },
  }));

export interface CartStore extends Instance<typeof CartModel> {}

export const createCartStore = () => CartModel.create({ items: [] });
