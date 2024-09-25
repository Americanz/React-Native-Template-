import { makeAutoObservable, runInAction } from "mobx";
import { load, save } from "../storage";

export interface BarcodeData {
  type: string;
  data: string;
  date: string;
  quantity: number;
}

const STORAGE_KEY = "barcode";

class BarcodeStore {
  barcode: BarcodeData[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchBarcode() {
    try {
      const storedBarcode = await load(STORAGE_KEY);
      if (storedBarcode) {
        runInAction(() => {
          this.barcode = storedBarcode as BarcodeData[];
        });
      }
    } catch (error) {
      console.error("Failed to fetch barcode:", error);
    }
  }

  async addOrUpdateBarcode(newBarcode: Omit<BarcodeData, "quantity">) {
    const existingBarcodeIndex = this.barcode.findIndex(
      (barcode) =>
        barcode.data === newBarcode.data && barcode.type === newBarcode.type
    );

    if (existingBarcodeIndex !== -1) {
      // Barcode exists, increase quantity
      this.barcode[existingBarcodeIndex].quantity += 1;
      this.barcode[existingBarcodeIndex].date = newBarcode.date; // Update the date to the latest scan
    } else {
      // New barcode, add with quantity 1
      this.barcode.push({ ...newBarcode, quantity: 1 });
    }

    await this.saveBarcode();
  }

  async updateBarcodeQuantity(index: number, quantity: number) {
    if (index >= 0 && index < this.barcode.length) {
      this.barcode[index].quantity = quantity;
      await this.saveBarcode();
    }
  }

  private async saveBarcode() {
    try {
      await save(STORAGE_KEY, this.barcode);
    } catch (error) {
      console.error("Failed to save barcode:", error);
    }
  }

  async clearBarcode() {
    this.barcode = [];
    await this.saveBarcode();
  }
}

export const barcodeStore = new BarcodeStore();
