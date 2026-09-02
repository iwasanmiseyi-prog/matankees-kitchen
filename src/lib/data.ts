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
  { category: "Rice Dishes", name: "Smokey Jollof Rice", prices: { "2L": 20, "4L": 35, "6L": 55 }, image: "/images/jollof-rice.jpg" },
  { category: "Rice Dishes", name: "Fried Rice", prices: { "2L": 20, "4L": 35, "6L": 55 }, image: "/images/fried-rice.png" },
  { category: "Rice Dishes", name: "Ofada Rice", prices: { on_order: true }, image: "/images/ofada-rice.jpg" },

  { category: "Proteins", name: "Chicken Stew", prices: { "2L": 30, "4L": 55, "6L": 80 }, image: "/images/stewed-chicken.jpg" },
  { category: "Proteins", name: "Assorted Meat Stew", prices: { "2L": 35, "4L": 65, "6L": 95 }, image: "/images/assorted-meat.jpg" },
  { category: "Proteins", name: "Peppered Beef", prices: { on_order: true }, image: "/images/peppered-beef.jpg" },
  { category: "Proteins", name: "Fish (Hake)", prices: { on_order: true }, image: "/images/fish-hake.jpg" },
  { category: "Proteins", name: "Grilled Peppered Fish / Fish Stew", prices: { on_order: true }, image: "/images/grilled-peppered-fish.jpg" },
  { category: "Proteins", name: "Peppered Goat Meat", prices: { on_order: true }, image: "/images/peppered goatmeat.jpg" },
  { category: "Proteins", name: "Peppered Ponmo", prices: { on_order: true }, image: "/images/peppered ponmo.jpg" },

  { category: "Soups & Stews", name: "Ayamase", prices: { "2L": 40, "4L": 75, "6L": 110 }, image: "/images/ayamase.jpg" },
  { category: "Soups & Stews", name: "Edikaekong", prices: { "2L": 45, "4L": 80, "6L": 115 }, image: "/images/edikaekong.jpg" },
  { category: "Soups & Stews", name: "Efo Riro", prices: { "2L": 40, "4L": 75, "6L": 105 }, image: "/images/efo-riro.jpeg" },
  { category: "Soups & Stews", name: "Okra Soup", prices: { "2L": 30, "4L": 55, "6L": 85 }, image: "/images/ila-alasepo.jpg" },
  { category: "Soups & Stews", name: "Egusi Soup", prices: { "2L": 40, "4L": 75, "6L": 105 }, image: "/images/egusi-soup.jpeg" },
  { category: "Soups & Stews", name: "Bitterleaf Soup", prices: { on_order: true }, image: "/images/bitterleaf-soup.jpg" },
  { category: "Soups & Stews", name: "Afang Soup", prices: { "2L": 45, "4L": 80, "6L": 115 }, image: "/images/afang-soup.jpg" },
  { category: "Soups & Stews", name: "Amala, Ewedu & Gbegiri", prices: { on_order: true }, image: "/images/Amala, Ewedu & Gbegiri.jpg" },
  { category: "Soups & Stews", name: "Oha Soup", prices: { on_order: true }, image: "/images/Oha Soup.jpg" },
  { category: "Soups & Stews", name: "Ogbono", prices: { "2L": 35, "4L": 65, "6L": 95 }, image: "/images/ogbono.jpg" },
  { category: "Soups & Stews", name: "Ofada Sauce", prices: { "2L": 40, "4L": 75, "6L": 110 }, image: "/images/ofada-sauce.jpg" },

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
