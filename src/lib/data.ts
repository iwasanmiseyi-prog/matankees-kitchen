export interface MenuPrice {
  [key: string]: number | boolean;
}

export interface MenuItem {
  category: string;
  name: string;
  prices: MenuPrice;
  note?: string;
}

export const menuData: MenuItem[] = [
  {"category":"Rice","name":"Jollof Rice","prices":{"5L":35,"7L":50,"10L":65,"12L":75}},
  {"category":"Rice","name":"Fried Rice","prices":{"5L":40,"7L":55,"10L":70,"12L":85}},
  {"category":"Rice","name":"Ofada Rice","prices":{"on_order":true}},
  {"category":"Protein","name":"Stewed Chicken / Chicken Stew","prices":{"5L":55,"7L":90,"10L":125,"12L":160}},
  {"category":"Protein","name":"Peppered Chicken","prices":{"15pcs":35}},
  {"category":"Protein","name":"Assorted Meat","prices":{"3L":50,"5L":65,"7L":105,"10L":145,"12L":185}},
  {"category":"Protein","name":"Peppered Beef","prices":{"20pcs":45}},
  {"category":"Protein","name":"Fish (Hake)","prices":{"5L_25pcs":70,"7L_50pcs":140}},
  {"category":"Protein","name":"Grilled Peppered Fish / Fish Stew","prices":{"5L_10pcs":45,"7L_20pcs":85,"10L":150}},
  {"category":"Sides","name":"Fried Plantain","prices":{"5L":50,"7L":80,"10L":110,"12L":140}},
  {"category":"Sides","name":"Giz-Dodo (Plantain & Gizzard)","prices":{"5L":65,"7L":105,"10L":145,"12L":185}},
  {"category":"Stews & Soups","name":"Stewed Beans (Ewa Agonyin)","prices":{"5L":65,"7L":105,"10L":145,"12L":185},"note":"With sauce"},
  {"category":"Stews & Soups","name":"Ayamase (Green pepper stew)","prices":{"5L":70,"7L":115,"10L":160,"12L":205}},
  {"category":"Stews & Soups","name":"Edikaekong (Waterleaf & ugu)","prices":{"5L":60,"7L":95,"10L":130,"12L":165}},
  {"category":"Stews & Soups","name":"Efo Riro (Vegetable soup)","prices":{"650ml":45,"2L":55,"3L":90,"5L":125,"7L":160}},
  {"category":"Stews & Soups","name":"Ila Alasepo (Okra Soup)","prices":{"5L":55,"7L":85,"10L":115,"12L":145}},
  {"category":"Stews & Soups","name":"Egusi","prices":{"5L":60,"7L":90,"10L":120,"12L":150}},
  {"category":"Stews & Soups","name":"Bitterleaf Soup","prices":{"5L":60,"7L":90,"10L":120,"12L":150,"extra":180}},
  {"category":"Stews & Soups","name":"Afang Soup","prices":{"5L":60,"7L":95,"10L":130,"12L":165,"extra":200}},
  {"category":"Stews & Soups","name":"Gbegiri","prices":{"5L":50,"7L":75,"10L":100,"12L":125}},
  {"category":"Stews & Soups","name":"Ewedu","prices":{"5L":50,"7L":75,"10L":100,"12L":125}},
  {"category":"Stews & Soups","name":"Ogbono","prices":{"on_order":true}},
  {"category":"Stews & Soups","name":"Ofada Sauce","prices":{"on_order":true}},
  {"category":"Stews & Soups","name":"Ekuru and Sauce","prices":{"on_order":true}},
  {"category":"Snacks","name":"Moin-Moin","prices":{"each":2.50}},
  {"category":"Snacks","name":"Akara","prices":{"each":0.55},"note":"Minimum 50 pieces \u2013 on request"},
  {"category":"Snacks","name":"Meatpie / Fishpie","prices":{"each":2.00},"note":"Minimum 15 pieces"},
  {"category":"Snacks","name":"Puff-Puff","prices":{"small_tray_25pcs":12.50,"medium_tray_50pcs":25,"large_tray_100pcs":50}},
  {"category":"Snacks","name":"Samosa","prices":{"30pcs":25}},
  {"category":"Snacks","name":"Spring Roll","prices":{"30pcs":25}}
];
