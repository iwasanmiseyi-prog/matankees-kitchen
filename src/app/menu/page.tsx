"use client";

import React, { useState } from "react";
import Image from "next/image";
import { menuData } from "@/lib/data";
import { useCart } from "@/components/CartProvider";
import { Plus, Check } from "lucide-react";

export default function MenuPage() {
  const { addToCart } = useCart();
  const [addedItem, setAddedItem] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // null means "All"

  // Group items by category
  const categories = Array.from(new Set(menuData.map(item => item.category)));

  const handleAddToCart = (item: any, size: string, price: number | boolean) => {
    addToCart({
      id: `${item.name}-${size}`,
      name: item.name,
      size: size === "each" ? "Per Item" : size,
      price: typeof price === "number" ? price : "on request",
      quantity: 1,
    });
    
    setAddedItem(`${item.name}-${size}`);
    setTimeout(() => setAddedItem(null), 2000);
  };

  // Determine which categories to render based on the filter
  const displayedCategories = selectedCategory ? [selectedCategory] : categories;

  return (
    <div className="container mx-auto px-4 py-16 text-white" id="menu">
      <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <h1 className="text-5xl md:text-6xl font-black text-primary mb-6 drop-shadow-md">Our Menu</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Authentic Nigerian recipes crafted with love. Please note some items require 24-48 hours notice.
        </p>
      </div>

      {/* Category Filter Bar */}
      <div className="flex flex-wrap justify-center gap-3 mb-16 animate-in zoom-in duration-700 delay-200">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-6 py-2 rounded-full font-bold text-sm md:text-base border-2 transition-all ${
            selectedCategory === null
              ? "bg-primary text-wood-dark border-primary shadow-[0_0_15px_rgba(255,204,0,0.4)]"
              : "bg-transparent text-white border-wood-light hover:border-primary hover:text-primary"
          }`}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-full font-bold text-sm md:text-base border-2 transition-all ${
              selectedCategory === cat
                ? "bg-primary text-wood-dark border-primary shadow-[0_0_15px_rgba(255,204,0,0.4)]"
                : "bg-transparent text-white border-wood-light hover:border-primary hover:text-primary"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="space-y-20">
        {displayedCategories.map((category, catIdx) => (
          <section key={category} className="space-y-10 animate-in fade-in duration-1000" style={{ animationDelay: `${catIdx * 100}ms` }}>
            <h2 className="text-3xl font-bold border-b-2 border-primary pb-4 flex items-center space-x-4">
              <span className="text-primary">{category}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 pt-8">
              {menuData.filter(item => item.category === category).map((item, idx) => (
                <div key={`${item.name}-${idx}`} className="bg-wood/40 backdrop-blur-sm border border-wood-light rounded-xl shadow-xl hover:shadow-[0_0_20px_rgba(255,204,0,0.15)] hover:border-primary/50 transition-all duration-300 flex flex-col items-center pt-0 mt-6 relative group">
                  
                  {/* Diamond Image Frame overlapping the top of the card */}
                  <div className="absolute -top-28 md:-top-36 lg:-top-40 diamond-frame border-[4px] border-primary w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 shadow-[0_0_18px_rgba(255,204,0,0.55)] bg-wood group-hover:-translate-y-2 transition-transform duration-500 z-10 flex-shrink-0">
                    <Image 
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="px-6 pb-6 pt-[11.5rem] md:pt-[14rem] lg:pt-[15.5rem] flex-grow flex flex-col w-full text-center">
                    <h3 className="text-2xl font-bold text-white mb-1">{item.name}</h3>
                    {item.note && (
                      <p className="text-sm text-primary italic mb-3">{item.note}</p>
                    )}
                    
                    <div className="mt-auto space-y-3 w-full text-left">
                      {Object.entries(item.prices).map(([size, price]) => (
                        <div key={size} className="flex items-center justify-between bg-wood-dark/80 p-3 rounded-lg border border-wood-light group/row hover:border-primary/40 transition-colors">
                          <div className="flex flex-col">
                            <span className="font-medium text-white/90">
                              {size === "on_order" ? "Available on Order" : size.replace(/_/g, ' ')}
                            </span>
                            <span className="text-primary font-bold text-lg">
                              {typeof price === "number" ? `£${price.toFixed(2)}` : "Price on Request"}
                            </span>
                          </div>
                          
                          <button 
                            onClick={() => handleAddToCart(item, size, price)}
                            className="bg-wood-dark border-2 border-primary text-primary hover:bg-primary hover:text-wood-dark p-2 rounded-full transition-all flex-shrink-0 shadow-[0_0_10px_rgba(255,204,0,0.2)] hover:shadow-[0_0_15px_rgba(255,204,0,0.6)]"
                            aria-label={`Add ${item.name} (${size}) to cart`}
                          >
                            {addedItem === `${item.name}-${size}` ? (
                              <Check className="w-5 h-5 text-green-400" />
                            ) : (
                              <Plus className="w-5 h-5" />
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
