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
  {"category":"Rice","name":"Jollof Rice","prices":{"5L":35,"7L":50,"10L":65,"12L":75}, "image":"https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=800&auto=format&fit=crop"},
  {"category":"Rice","name":"Fried Rice","prices":{"5L":40,"7L":55,"10L":70,"12L":85}, "image":"https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop"},
  {"category":"Rice","name":"Ofada Rice","prices":{"on_order":true}, "image":"https://images.unsplash.com/photo-1626844131082-256783844137?q=80&w=800&auto=format&fit=crop"},
  
  {"category":"Protein","name":"Stewed Chicken / Chicken Stew","prices":{"5L":55,"7L":90,"10L":125,"12L":160}, "image":"https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=800&auto=format&fit=crop"},
  {"category":"Protein","name":"Peppered Chicken","prices":{"15pcs":35}, "image":"https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?q=80&w=800&auto=format&fit=crop"},
  {"category":"Protein","name":"Assorted Meat","prices":{"3L":50,"5L":65,"7L":105,"10L":145,"12L":185}, "image":"https://images.unsplash.com/photo-1544025162-811c75c88b0a?q=80&w=800&auto=format&fit=crop"},
  {"category":"Protein","name":"Peppered Beef","prices":{"20pcs":45}, "image":"https://images.unsplash.com/photo-1544025162-811c75c88b0a?q=80&w=800&auto=format&fit=crop"},
  {"category":"Protein","name":"Fish (Hake)","prices":{"5L_25pcs":70,"7L_50pcs":140}, "image":"https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop"},
  {"category":"Protein","name":"Grilled Peppered Fish / Fish Stew","prices":{"5L_10pcs":45,"7L_20pcs":85,"10L":150}, "image":"https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop"},
  
  {"category":"Sides","name":"Fried Plantain","prices":{"5L":50,"7L":80,"10L":110,"12L":140}, "image":"https://images.unsplash.com/photo-1628198758804-d02f540306ea?q=80&w=800&auto=format&fit=crop"},
  {"category":"Sides","name":"Giz-Dodo (Plantain & Gizzard)","prices":{"5L":65,"7L":105,"10L":145,"12L":185}, "image":"https://images.unsplash.com/photo-1628198758804-d02f540306ea?q=80&w=800&auto=format&fit=crop"},
  
  {"category":"Stews & Soups","name":"Stewed Beans (Ewa Agonyin)","prices":{"5L":65,"7L":105,"10L":145,"12L":185},"note":"With sauce", "image":"https://images.pexels.com/photos/35490114/pexels-photo-35490114.jpeg?q=80&w=800&auto=format&fit=crop"},
  {"category":"Stews & Soups","name":"Ayamase (Green pepper stew)","prices":{"5L":70,"7L":115,"10L":160,"12L":205}, "image":"https://images.unsplash.com/photo-1606491956689-2ea866880c84?q=80&w=800&auto=format&fit=crop"},
  {"category":"Stews & Soups","name":"Edikaekong (Waterleaf & ugu)","prices":{"5L":60,"7L":95,"10L":130,"12L":165}, "image":"https://images.unsplash.com/photo-1515516969-d4008cc6241a?q=80&w=800&auto=format&fit=crop"},
  {"category":"Stews & Soups","name":"Efo Riro (Vegetable soup)","prices":{"650ml":45,"2L":55,"3L":90,"5L":125,"7L":160}, "image":"https://images.unsplash.com/photo-1515516969-d4008cc6241a?q=80&w=800&auto=format&fit=crop"},
  {"category":"Stews & Soups","name":"Ila Alasepo (Okra Soup)","prices":{"5L":55,"7L":85,"10L":115,"12L":145}, "image":"https://images.pexels.com/photos/35490114/pexels-photo-35490114.jpeg?q=80&w=800&auto=format&fit=crop"},
  {"category":"Stews & Soups","name":"Egusi","prices":{"5L":60,"7L":90,"10L":120,"12L":150}, "image":"https://images.pexels.com/photos/35490114/pexels-photo-35490114.jpeg?q=80&w=800&auto=format&fit=crop"},
  {"category":"Stews & Soups","name":"Bitterleaf Soup","prices":{"5L":60,"7L":90,"10L":120,"12L":150,"extra":180}, "image":"https://images.unsplash.com/photo-1515516969-d4008cc6241a?q=80&w=800&auto=format&fit=crop"},
  {"category":"Stews & Soups","name":"Afang Soup","prices":{"5L":60,"7L":95,"10L":130,"12L":165,"extra":200}, "image":"https://images.unsplash.com/photo-1515516969-d4008cc6241a?q=80&w=800&auto=format&fit=crop"},
  {"category":"Stews & Soups","name":"Gbegiri","prices":{"5L":50,"7L":75,"10L":100,"12L":125}, "image":"https://images.pexels.com/photos/35490114/pexels-photo-35490114.jpeg?q=80&w=800&auto=format&fit=crop"},
  {"category":"Stews & Soups","name":"Ewedu","prices":{"5L":50,"7L":75,"10L":100,"12L":125}, "image":"https://images.unsplash.com/photo-1515516969-d4008cc6241a?q=80&w=800&auto=format&fit=crop"},
  {"category":"Stews & Soups","name":"Ogbono","prices":{"on_order":true}, "image":"https://images.pexels.com/photos/35490114/pexels-photo-35490114.jpeg?q=80&w=800&auto=format&fit=crop"},
  {"category":"Stews & Soups","name":"Ofada Sauce","prices":{"on_order":true}, "image":"https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=800&auto=format&fit=crop"},
  {"category":"Stews & Soups","name":"Ekuru and Sauce","prices":{"on_order":true}, "image":"https://images.unsplash.com/photo-1544025162-811c75c88b0a?q=80&w=800&auto=format&fit=crop"},
  
  {"category":"Snacks","name":"Moin-Moin","prices":{"each":2.50}, "image":"https://images.unsplash.com/photo-1604908177520-2022b7a97ab0?q=80&w=800&auto=format&fit=crop"},
  {"category":"Snacks","name":"Akara","prices":{"each":0.55},"note":"Minimum 50 pieces \u2013 on request", "image":"https://images.unsplash.com/photo-1595183424163-fdf46a2a530f?q=80&w=800&auto=format&fit=crop"},
  {"category":"Snacks","name":"Meatpie / Fishpie","prices":{"each":2.00},"note":"Minimum 15 pieces", "image":"https://images.unsplash.com/photo-1509365465985-25d11c17e812?q=80&w=800&auto=format&fit=crop"},
  {"category":"Snacks","name":"Puff-Puff","prices":{"small_tray_25pcs":12.50,"medium_tray_50pcs":25,"large_tray_100pcs":50}, "image":"https://images.unsplash.com/photo-1595183424163-fdf46a2a530f?q=80&w=800&auto=format&fit=crop"},
  {"category":"Snacks","name":"Samosa","prices":{"30pcs":25}, "image":"https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop"},
  {"category":"Snacks","name":"Spring Roll","prices":{"30pcs":25}, "image":"https://images.unsplash.com/photo-1588665046200-a3375b4dc10b?q=80&w=800&auto=format&fit=crop"}
];
