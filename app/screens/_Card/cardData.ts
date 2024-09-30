export interface CardData {
  title: string;
  description: string;
  image: string;
  checked: boolean;
  disabled: boolean;
}

export const cardData: CardData[] = [
  {
    title: "Category A",
    description: "Motorcycles",
    image: "https://i.ibb.co/zXmHzBk/category-a.png",
    checked: false,
    disabled: false,
  },
  {
    title: "Category B",
    description: "Cars and ATVs",
    image: "https://i.ibb.co/cXjw2Gz/category-b.png",
    checked: false,
    disabled: false,
  },
  {
    title: "Category C",
    description: "Large goods vehicle",
    image: "https://i.ibb.co/nDbfH9B/category-c.png",
    checked: false,
    disabled: false,
  },
  {
    title: "Category D",
    description: "Buses",
    image: "https://i.ibb.co/7gSQMmm/category-d.png",
    checked: false,
    disabled: false,
  },
  {
    title: "Category T",
    description: "Tractors and SMV",
    image: "https://i.ibb.co/0F3SdsX/category-t.png",
    checked: false,
    disabled: false,
  },
  {
    title: "Other",
    description: "Additional categories",
    image: "https://i.ibb.co/WDwmPy5/other.png",
    checked: false,
    disabled: true,
  },
];
