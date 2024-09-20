import { makeAutoObservable, runInAction } from "mobx";
import { load, save } from "../storage";

export interface BarcodeData {
  type: string;
  data: string;
  date: string;
  quantity: number;
}

const STORAGE_KEY = "barcodes";

class BarcodeStore {
  barcodes: BarcodeData[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  async fetchBarcodes() {
    try {
      const storedBarcodes = await load(STORAGE_KEY);
      if (storedBarcodes) {
        runInAction(() => {
          this.barcodes = storedBarcodes as BarcodeData[];
        });
      }
    } catch (error) {
      console.error("Failed to fetch barcodes:", error);
    }
  }

  async addOrUpdateBarcode(newBarcode: Omit<BarcodeData, "quantity">) {
    const existingBarcodeIndex = this.barcodes.findIndex(
      (barcode) =>
        barcode.data === newBarcode.data && barcode.type === newBarcode.type
    );

    if (existingBarcodeIndex !== -1) {
      // Barcode exists, increase quantity
      this.barcodes[existingBarcodeIndex].quantity += 1;
      this.barcodes[existingBarcodeIndex].date = newBarcode.date; // Update the date to the latest scan
    } else {
      // New barcode, add with quantity 1
      this.barcodes.push({ ...newBarcode, quantity: 1 });
    }

    await this.saveBarcodes();
  }

  async updateBarcodeQuantity(index: number, quantity: number) {
    if (index >= 0 && index < this.barcodes.length) {
      this.barcodes[index].quantity = quantity;
      await this.saveBarcodes();
    }
  }

  private async saveBarcodes() {
    try {
      await save(STORAGE_KEY, this.barcodes);
    } catch (error) {
      console.error("Failed to save barcodes:", error);
    }
  }

  async clearBarcodes() {
    this.barcodes = [];
    await this.saveBarcodes();
  }
}

export const barcodeStore = new BarcodeStore();
