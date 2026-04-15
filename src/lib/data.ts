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

export const menuData: MenuItem[] = [
  {"category":"Rice Dishes","name":"Jollof Rice","prices":{"5L":35,"7L":50,"10L":65,"12L":75}, "image":"/images/jollof-rice.jpeg"},
  {"category":"Rice Dishes","name":"Fried Rice","prices":{"5L":40,"7L":55,"10L":70,"12L":85}, "image":"/images/fried-rice.jpg"},
  {"category":"Rice Dishes","name":"Ofada Rice","prices":{"on_order":true}, "image":"/images/ofada-rice.jpg"},
  
  {"category":"Proteins","name":"Stewed Chicken / Chicken Stew","prices":{"5L":55,"7L":90,"10L":125,"12L":160}, "image":"/images/stewed-chicken.jpg"},
  {"category":"Proteins","name":"Assorted Meat","prices":{"3L":50,"5L":65,"7L":105,"10L":145,"12L":185}, "image":"/images/assorted-meat.jpg"},
  {"category":"Proteins","name":"Peppered Beef","prices":{"20pcs":45}, "image":"/images/peppered-beef.jpg"},
  {"category":"Proteins","name":"Fish (Hake)","prices":{"5L_25pcs":70,"7L_50pcs":140}, "image":"/images/fish-hake.jpg"},
  {"category":"Proteins","name":"Grilled Peppered Fish / Fish Stew","prices":{"5L_10pcs":45,"7L_20pcs":85,"10L":150}, "image":"/images/grilled-peppered-fish.jpg"},
  {"category":"Proteins","name":"Peppered Goat Meat","prices":{"on_order":true}, "image":"/images/peppered goatmeat.jpg"},
  {"category":"Proteins","name":"Peppered Ponmo","prices":{"on_order":true}, "image":"/images/peppered ponmo.jpg"},
  
  {"category":"Soups & Stews","name":"Ayamase (Green pepper stew)","prices":{"5L":70,"7L":115,"10L":160,"12L":205}, "image":"/images/ayamase.jpg"},
  {"category":"Soups & Stews","name":"Edikaekong (Waterleaf & ugu)","prices":{"5L":60,"7L":95,"10L":130,"12L":165}, "image":"/images/edikaekong.jpg"},
  {"category":"Soups & Stews","name":"Efo Riro (Vegetable soup)","prices":{"650ml":45,"2L":55,"3L":90,"5L":125,"7L":160}, "image":"/images/efo-riro.jpeg"},
  {"category":"Soups & Stews","name":"Ila Alasepo (Okra Soup)","prices":{"5L":55,"7L":85,"10L":115,"12L":145}, "image":"/images/ila-alasepo.jpg"},
  {"category":"Soups & Stews","name":"Egusi","prices":{"5L":60,"7L":90,"10L":120,"12L":150}, "image":"/images/egusi-soup.jpeg"},
  {"category":"Soups & Stews","name":"Bitterleaf Soup","prices":{"5L":60,"7L":90,"10L":120,"12L":150,"extra":180}, "image":"/images/bitterleaf-soup.jpg"},
  {"category":"Soups & Stews","name":"Afang Soup","prices":{"5L":60,"7L":95,"10L":130,"12L":165,"extra":200}, "image":"/images/afang-soup.jpg"},
  {"category":"Soups & Stews","name":"Gbegiri","prices":{"5L":50,"7L":75,"10L":100,"12L":125}, "image":"/images/gbegiri.jpeg"},
  {"category":"Soups & Stews","name":"Ewedu","prices":{"5L":50,"7L":75,"10L":100,"12L":125}, "image":"/images/ewedu.jpg"},
  {"category":"Soups & Stews","name":"Ogbono","prices":{"on_order":true}, "image":"/images/ogbono.jpg"},
  {"category":"Soups & Stews","name":"Ofada Sauce","prices":{"on_order":true}, "image":"/images/ofada-sauce.jpg"},
  
  {"category":"Pastries","name":"Meatpie / Fishpie","prices":{"each":2.00},"note":"Minimum 15 pieces", "image":"/images/meatpie.jpg"},
  {"category":"Pastries","name":"Puff-Puff","prices":{"small_tray_25pcs":12.50,"medium_tray_50pcs":25,"large_tray_100pcs":50}, "image":"/images/puff-puff.jpg"},
  {"category":"Pastries","name":"Samosa","prices":{"30pcs":25}, "image":"/images/samosa.jpg"},
  {"category":"Pastries","name":"Spring Roll","prices":{"30pcs":25}, "image":"/images/spring-roll.jpg"},

  {"category":"Other Meals","name":"Ekuru and sauce","prices":{"on_order":true}, "image":"/images/ekuru-and-sauce.jpg"},
  {"category":"Other Meals","name":"Moin-moin","prices":{"on_order":true}, "image":"/images/moin-moin.jpg"},
  {"category":"Other Meals","name":"Yam porridge","prices":{"on_order":true}, "image":"/images/yam-porridge.jpg"},
  {"category":"Other Meals","name":"Beans porridge","prices":{"on_order":true}, "image":"/images/beans-porridge.jpg"},
  {"category":"Other Meals","name":"Ewa aganyin (with black sauce)","prices":{"on_order":true}, "image":"/images/ewa-agonyin.jpg"},
  {"category":"Other Meals","name":"Akara","prices":{"on_order":true},"note":"Minimum 50 pieces – on request", "image":"/images/akara.jpg"},
  {"category":"Other Meals","name":"Fried yam and sauce","prices":{"on_order":true}, "image":"/images/fried yam and sauce.jpg"},
  {"category":"Other Meals","name":"Plantain","prices":{"on_order":true}, "image":"/images/fried-plantain.jpg"},
  {"category":"Other Meals","name":"Gizdodo","prices":{"on_order":true}, "image":"/images/giz-dodo.jpg"}
];
