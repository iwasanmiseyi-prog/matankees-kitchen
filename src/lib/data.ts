export interface MenuPrice {
  [key: string]: number | boolean | undefined;
}

export interface MenuItem {
  category: string;
  name: string;
  prices: MenuPrice;
  note?: string;
  image: string;
  minOrder?: number;
}

export const menuData: MenuItem[] = [
  // Rice Dishes
  {
    category: "Rice Dishes",
    name: "Smokey Jollof Rice",
    prices: { "650-800mls": 8, "2L": 20, "4L": 35, "6L": 55, "20-24L": 120 },
    image: "/images/jollof-rice.jpg",
  },
  {
    category: "Rice Dishes",
    name: "Fried Rice",
    prices: { "650-800mls": 8, "2L": 20, "4L": 35, "6L": 55, "20-24L": 120 },
    image: "/images/fried-rice.png",
  },
  {
    category: "Rice Dishes",
    name: "Ofada Rice",
    prices: { on_order: true },
    image: "/images/ofada-rice.jpg",
  },

  // Proteins
  {
    category: "Proteins",
    name: "Peppered Chicken",
    prices: { "10 pcs": 15 },
    note: "10 pieces",
    image: "/images/peppered-chicken.jpg",
  },
  {
    category: "Proteins",
    name: "Peppered Beef",
    prices: { "10 pcs": 30 },
    note: "10 pieces",
    image: "/images/peppered-beef.jpg",
  },
  {
    category: "Proteins",
    name: "Peppered Ponmo",
    prices: { "10 pcs": 25, "650-800mls": 10 },
    image: "/images/peppered ponmo.jpg",
  },
  {
    category: "Proteins",
    name: "Peppered Fish",
    prices: { "10 pcs": 35, "20 pcs": 75 },
    image: "/images/grilled-peppered-fish.jpg",
  },
  {
    category: "Proteins",
    name: "Chicken Stew",
    prices: { "650-800mls": 10, "2L": 30, "4L": 55, "6L": 80 },
    image: "/images/stewed-chicken.jpg",
  },
  {
    category: "Proteins",
    name: "Beef Stew",
    prices: { "2L": 45, "4L": 75, "6L": 95 },
    image: "/images/assorted-meat.jpg",
  },
  {
    category: "Proteins",
    name: "Assorted Meat Stew",
    prices: { "650-800mls": 10, "2L": 40, "4L": 70, "6L": 90 },
    image: "/images/Assorted meat stew.png",
  },
  {
    category: "Proteins",
    name: "Hake / Titus Fish Stew",
    prices: { "2L": 50, "4L": 90, "6L": 110 },
    image: "/images/fish-hake.jpg",
  },
  {
    category: "Proteins",
    name: "Peppered Goat Meat",
    prices: { on_order: true },
    image: "/images/peppered goatmeat.jpg",
  },

  // Soups & Stews
  {
    category: "Soups & Stews",
    name: "Ayamase / Ofada Sauce",
    prices: { "650-800mls": 12, "2L": 40, "4L": 75, "6L": 110 },
    image: "/images/ayamase.jpg",
  },
  {
    category: "Soups & Stews",
    name: "Edikaekong Soup",
    prices: { "2L": 45, "4L": 80, "6L": 115 },
    image: "/images/edikaekong.jpg",
  },
  {
    category: "Soups & Stews",
    name: "Efo Riro Soup",
    prices: { "2L": 40, "4L": 75, "6L": 105 },
    image: "/images/efo-riro.jpeg",
  },
  {
    category: "Soups & Stews",
    name: "Ogbono Soup",
    prices: { "2L": 35, "4L": 65, "6L": 95 },
    image: "/images/ogbono.jpg",
  },
  {
    category: "Soups & Stews",
    name: "Okra Soup",
    prices: { "2L": 35, "4L": 65, "6L": 95 },
    image: "/images/ila-alasepo.jpg",
  },
  {
    category: "Soups & Stews",
    name: "Egusi Soup",
    prices: { "2L": 40, "4L": 75, "6L": 105 },
    image: "/images/egusi-soup.jpeg",
  },
  {
    category: "Soups & Stews",
    name: "Afang Soup",
    prices: { "2L": 45, "4L": 80, "6L": 115 },
    image: "/images/afang-soup.jpg",
  },
  {
    category: "Soups & Stews",
    name: "Oha Soup",
    prices: { "2L": 40, "4L": 75, "6L": 100 },
    image: "/images/Oha Soup.jpg",
  },
  {
    category: "Soups & Stews",
    name: "Bitterleaf Soup",
    prices: { "2L": 40, "4L": 75, "6L": 100 },
    image: "/images/bitterleaf-soup.jpg",
  },
  {
    category: "Soups & Stews",
    name: "Amala, Ewedu & Gbegiri",
    prices: { on_order: true },
    image: "/images/Amala, Ewedu & Gbegiri.jpg",
  },

  // Pastries
  {
    category: "Pastries",
    name: "Meatpie / Fishroll",
    prices: { "10 pcs": 20 },
    note: "10 pieces",
    image: "/images/meatpie.jpg",
  },
  {
    category: "Pastries",
    name: "Puff-Puff",
    prices: { "Small tray (25pcs)": 10 },
    note: "Small tray (25 pieces)",
    image: "/images/puff-puff.jpg",
  },
  {
    category: "Pastries",
    name: "Samosa",
    prices: { "25 pcs": 25 },
    note: "25 pieces",
    image: "/images/samosa.jpg",
  },
  {
    category: "Pastries",
    name: "Spring Roll",
    prices: { "25 pcs": 25 },
    note: "25 pieces",
    image: "/images/spring-roll.jpg",
  },

  // Other Meals
  {
    category: "Other Meals",
    name: "Yam Porridge",
    prices: { "2L": 40, "4L": 75, "6L": 105 },
    image: "/images/yam-porridge.jpg",
  },
  {
    category: "Other Meals",
    name: "Beans and Aganyin Sauce",
    prices: { "2L": 45, "4L": 80, "6L": 115 },
    image: "/images/ewa-agonyin.jpg",
  },
  {
    category: "Other Meals",
    name: "Moin-Moin",
    prices: { "Each (min 7)": 3.5 },
    note: "£3.50 each (minimum order 7 pieces)",
    minOrder: 7,
    image: "/images/moin-moin.jpg",
  },
  {
    category: "Other Meals",
    name: "Akara",
    prices: { "20 pcs": 10 },
    note: "20 pieces",
    image: "/images/akara.jpg",
  },
  {
    category: "Other Meals",
    name: "Ekuru and Sauce",
    prices: { on_order: true },
    note: "Available on request",
    image: "/images/ekuru-and-sauce.jpg",
  },
  {
    category: "Other Meals",
    name: "Beans Porridge",
    prices: { on_order: true },
    image: "/images/beans-porridge.jpg",
  },
  {
    category: "Other Meals",
    name: "Fried Yam and Sauce",
    prices: { on_order: true },
    image: "/images/fried yam and sauce.jpg",
  },
  {
    category: "Other Meals",
    name: "Plantain",
    prices: { on_order: true },
    image: "/images/fried-plantain.jpg",
  },
  {
    category: "Other Meals",
    name: "Gizdodo",
    prices: { on_order: true },
    image: "/images/giz-dodo.jpg",
  },
];
