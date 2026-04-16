export interface MenuPrice {
  [key: string]: number | boolean;
}

export interface MenuItem {
  category: string;
  name: string;
  prices: MenuPrice;
  note?: string;
  image: string;
}

/** All pot meals are priced at 2L / 4L / 6L only (GBP). */
export const menuData: MenuItem[] = [
  { category: "Rice Dishes", name: "Jollof Rice", prices: { "2L": 14, "4L": 28, "6L": 42 }, image: "/images/jollof-rice.jpeg" },
  { category: "Rice Dishes", name: "Fried Rice", prices: { "2L": 16, "4L": 32, "6L": 48 }, image: "/images/fried-rice.jpg" },
  { category: "Rice Dishes", name: "Ofada Rice", prices: { on_order: true }, image: "/images/ofada-rice.jpg" },

  { category: "Proteins", name: "Stewed Chicken / Chicken Stew", prices: { "2L": 22, "4L": 44, "6L": 66 }, image: "/images/stewed-chicken.jpg" },
  { category: "Proteins", name: "Assorted Meat", prices: { "2L": 26, "4L": 52, "6L": 78 }, image: "/images/assorted-meat.jpg" },
  { category: "Proteins", name: "Peppered Beef", prices: { on_order: true }, image: "/images/peppered-beef.jpg" },
  { category: "Proteins", name: "Fish (Hake)", prices: { on_order: true }, image: "/images/fish-hake.jpg" },
  { category: "Proteins", name: "Grilled Peppered Fish / Fish Stew", prices: { on_order: true }, image: "/images/grilled-peppered-fish.jpg" },
  { category: "Proteins", name: "Peppered Goat Meat", prices: { on_order: true }, image: "/images/peppered goatmeat.jpg" },
  { category: "Proteins", name: "Peppered Ponmo", prices: { on_order: true }, image: "/images/peppered ponmo.jpg" },

  { category: "Soups & Stews", name: "Ayamase (Green pepper stew)", prices: { "2L": 28, "4L": 56, "6L": 84 }, image: "/images/ayamase.jpg" },
  { category: "Soups & Stews", name: "Edikaekong (Waterleaf & ugu)", prices: { "2L": 24, "4L": 48, "6L": 72 }, image: "/images/edikaekong.jpg" },
  { category: "Soups & Stews", name: "Efo Riro (Vegetable soup)", prices: { "2L": 22, "4L": 44, "6L": 66 }, image: "/images/efo-riro.jpeg" },
  { category: "Soups & Stews", name: "Ila Alasepo (Okra Soup)", prices: { "2L": 22, "4L": 44, "6L": 66 }, image: "/images/ila-alasepo.jpg" },
  { category: "Soups & Stews", name: "Egusi", prices: { "2L": 24, "4L": 48, "6L": 72 }, image: "/images/egusi-soup.jpeg" },
  { category: "Soups & Stews", name: "Bitterleaf Soup", prices: { "2L": 24, "4L": 48, "6L": 72 }, image: "/images/bitterleaf-soup.jpg" },
  { category: "Soups & Stews", name: "Afang Soup", prices: { "2L": 24, "4L": 48, "6L": 72 }, image: "/images/afang-soup.jpg" },
  { category: "Soups & Stews", name: "Gbegiri", prices: { "2L": 20, "4L": 40, "6L": 60 }, image: "/images/gbegiri.jpeg" },
  { category: "Soups & Stews", name: "Ewedu", prices: { "2L": 20, "4L": 40, "6L": 60 }, image: "/images/ewedu.jpg" },
  { category: "Soups & Stews", name: "Ogbono", prices: { on_order: true }, image: "/images/ogbono.jpg" },
  { category: "Soups & Stews", name: "Ofada Sauce", prices: { on_order: true }, image: "/images/ofada-sauce.jpg" },

  { category: "Pastries", name: "Meatpie / Fishpie", prices: { on_order: true }, note: "Minimum 15 pieces", image: "/images/meatpie.jpg" },
  { category: "Pastries", name: "Puff-Puff", prices: { on_order: true }, image: "/images/puff-puff.jpg" },
  { category: "Pastries", name: "Samosa", prices: { on_order: true }, image: "/images/samosa.jpg" },
  { category: "Pastries", name: "Spring Roll", prices: { on_order: true }, image: "/images/spring-roll.jpg" },

  { category: "Other Meals", name: "Ekuru and sauce", prices: { on_order: true }, image: "/images/ekuru-and-sauce.jpg" },
  { category: "Other Meals", name: "Moin-moin", prices: { on_order: true }, image: "/images/moin-moin.jpg" },
  { category: "Other Meals", name: "Yam porridge", prices: { on_order: true }, image: "/images/yam-porridge.jpg" },
  { category: "Other Meals", name: "Beans porridge", prices: { on_order: true }, image: "/images/beans-porridge.jpg" },
  { category: "Other Meals", name: "Ewa aganyin (with black sauce)", prices: { on_order: true }, image: "/images/ewa-agonyin.jpg" },
  { category: "Other Meals", name: "Akara", prices: { on_order: true }, note: "Minimum 50 pieces – on request", image: "/images/akara.jpg" },
  { category: "Other Meals", name: "Fried yam and sauce", prices: { on_order: true }, image: "/images/fried yam and sauce.jpg" },
  { category: "Other Meals", name: "Plantain", prices: { on_order: true }, image: "/images/fried-plantain.jpg" },
  { category: "Other Meals", name: "Gizdodo", prices: { on_order: true }, image: "/images/giz-dodo.jpg" },
];
