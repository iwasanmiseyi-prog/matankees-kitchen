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

  const menuSections: Array<{
    id: string;
    title: string;
    sourceCategories: string[];
  }> = [
    { id: "rice", title: "🍚 Rice Dishes", sourceCategories: ["Rice Dishes"] },
    { id: "soups", title: "🥘 Soups & Stews", sourceCategories: ["Soups & Stews"] },
    { id: "proteins", title: "🍖 Proteins", sourceCategories: ["Proteins"] },
    { id: "pastries", title: "🥟 Pastries", sourceCategories: ["Pastries"] },
    { id: "other", title: "🍽️ Other Meals", sourceCategories: ["Other Meals"] },
  ];

  const getDisplayPrices = (prices: Record<string, number | boolean>) => {
    if (prices.on_order) return [] as Array<[string, number | boolean]>;

    const allowed = ["2L", "4L", "6L"] as const;
    return allowed
      .map((k) => [k, prices[k]] as [string, number | boolean])
      .filter(([, p]) => typeof p === "number");
  };

  const handleAddToCart = (item: any, size: string, price: number | boolean) => {
    addToCart({
      id: `${item.name}-${size}`,
      name: item.name,
      size: size === "each" ? "Per Item" : size,
      price: typeof price === "number" ? price : "on request",
      image: item.image,
      quantity: 1,
    });
    
    setAddedItem(`${item.name}-${size}`);
    setTimeout(() => setAddedItem(null), 2000);
  };

  const displayedSections = selectedCategory
    ? menuSections.filter((s) => s.id === selectedCategory)
    : menuSections;

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
        {menuSections.map((section) => (
          <button
            key={section.id}
            onClick={() => setSelectedCategory(section.id)}
            className={`px-6 py-2 rounded-full font-bold text-sm md:text-base border-2 transition-all ${
              selectedCategory === section.id
                ? "bg-primary text-wood-dark border-primary shadow-[0_0_15px_rgba(255,204,0,0.4)]"
                : "bg-transparent text-white border-wood-light hover:border-primary hover:text-primary"
            }`}
          >
            {section.title}
          </button>
        ))}
      </div>

      <div className="space-y-20">
        {displayedSections.map((section, catIdx) => (
          <section key={section.id} className="space-y-10 animate-in fade-in duration-1000" style={{ animationDelay: `${catIdx * 100}ms` }}>
            <h2 className="text-4xl md:text-5xl font-black pb-4 flex items-center space-x-4 border-b-2 border-primary/80">
              <span className="text-primary drop-shadow-[0_2px_2px_rgba(0,0,0,0.35)]">{section.title}</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 pt-8">
              {menuData
                .filter((item) => section.sourceCategories.includes(item.category))
                .map((item, idx) => (
                <div key={`${item.name}-${idx}`} className="bg-wood/40 backdrop-blur-sm border border-wood-light rounded-xl shadow-xl hover:shadow-[0_0_20px_rgba(255,204,0,0.15)] hover:border-primary/50 transition-all duration-300 flex flex-col items-center pt-6 mt-6 relative group">
                  {/* Diamond Image Frame (inside the card) */}
                  <div className="diamond-frame border-[4px] border-primary w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 shadow-[0_0_18px_rgba(255,204,0,0.55)] bg-wood relative group-hover:-translate-y-1 transition-transform duration-500 z-10 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className="px-6 pb-6 pt-4 flex-grow flex flex-col w-full text-center">
                    <h3 className="text-2xl font-bold text-white mb-0.5 leading-tight">{item.name}</h3>
                    {item.note && (
                      <p className="text-sm text-primary italic mb-2">{item.note}</p>
                    )}
                    
                    <div className="mt-auto space-y-3 w-full text-left">
                      {item.prices.on_order ? (
                        <div className="bg-wood-dark/80 p-4 rounded-lg border border-wood-light text-center">
                          <p className="text-white font-semibold">Available on order</p>
                          <p className="text-sm text-muted-foreground mt-2">
                            Please message us on WhatsApp for 2L / 4L / 6L portions and pricing.
                          </p>
                          <a
                            href="https://wa.me/447466705927"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex mt-4 bg-primary text-wood-dark px-6 py-2 rounded-full font-bold hover:bg-golden-hover transition-colors"
                          >
                            WhatsApp us
                          </a>
                        </div>
                      ) : (
                        getDisplayPrices(item.prices).map(([size, price]) => (
                          <div
                            key={size}
                            className="flex items-center justify-between bg-wood-dark/80 p-3 rounded-lg border border-wood-light group/row hover:border-primary/40 transition-colors"
                          >
                            <div className="flex flex-col">
                              <span className="font-medium text-white/90">{size.replace(/_/g, " ")}</span>
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
                        ))
                      )}
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
