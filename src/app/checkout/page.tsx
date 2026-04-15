"use client";

import React, { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { Trash2, ShoppingBag, MapPin, Truck, Minus, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, removeFromCart, incrementItem, decrementItem, totalPrice, totalItems } = useCart();
  const [method, setMethod] = useState<"pickup" | "delivery">("pickup");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    if (method === "delivery" && !address.trim()) {
      setError("Please enter a valid UK delivery address.");
      return;
    }
    
    setError("");
    setLoading(true);

    try {
      // Basic checkout flow integration
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, method, address }),
      });

      if (response.ok) {
        const { url } = await response.json();
        // Redirect to hosted checkout or internal success page
        if (url) {
           window.location.href = url;
        } else {
           router.push("/success");
        }
      } else {
        setError("Checkout failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred during checkout.");
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-24 text-center max-w-lg">
        <div className="bg-card border border-wood-light rounded-xl p-12 shadow-xl">
          <ShoppingBag className="mx-auto h-16 w-16 text-primary/50 mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">
            Looks like you haven't added any delicious meals to your cart yet.
          </p>
          <Link href="/menu" className="bg-primary text-wood-dark px-8 py-3 rounded-full font-bold hover:bg-golden-hover transition-colors">
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="text-4xl font-bold text-primary mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-card border border-wood-light rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-primary/20 pb-4">
              1. Order Method
            </h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <button
                type="button"
                onClick={() => setMethod("pickup")}
                className={`p-4 rounded-lg border-2 flex flex-col items-center justify-center gap-3 transition-colors ${
                  method === "pickup" 
                    ? "border-primary bg-primary/10 text-primary" 
                    : "border-wood-light text-muted-foreground hover:border-primary/50 text-white"
                }`}
              >
                <MapPin size={32} />
                <span className="font-bold">Pickup in Baldock</span>
              </button>
              
              <button
                type="button"
                onClick={() => setMethod("delivery")}
                className={`p-4 rounded-lg border-2 flex flex-col items-center justify-center gap-3 transition-colors ${
                  method === "delivery" 
                    ? "border-primary bg-primary/10 text-primary" 
                    : "border-wood-light text-muted-foreground hover:border-primary/50 text-white"
                }`}
              >
                <Truck size={32} />
                <span className="font-bold">UK Nationwide Delivery</span>
              </button>
            </div>
          </section>

          <section className="bg-card border border-wood-light rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-bold text-white mb-6 border-b border-primary/20 pb-4">
              2. Details & Payment
            </h2>
            
            <form id="checkout-form" onSubmit={handleCheckout} className="space-y-6">
              {method === "delivery" && (
                <div className="space-y-2">
                  <label htmlFor="address" className="block text-sm font-medium text-white">
                    Delivery Address (Full UK address with Postcode)
                  </label>
                  <textarea
                    id="address"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-wood-dark border border-wood-light rounded-lg p-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none min-h-[100px]"
                    placeholder="E.g., 123 High Street, London, E1 6AN"
                  />
                  {error && <p className="text-destructive text-sm font-medium mt-2">{error}</p>}
                </div>
              )}
              
              <div className="bg-wood-dark p-4 rounded-lg border border-wood-light">
                <p className="text-sm text-muted-foreground mb-2">
                  Payments are securely processed online. You will be redirected to complete your payment.
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  We accept Debit/Credit Cards (secure online payment) and Bank Transfer.
                  <br />
                  For bank transfer, please send proof of payment via WhatsApp.
                </p>
                <div className="text-sm text-white/90 bg-wood/40 border border-wood-light rounded-lg p-4 mb-4">
                  <p className="font-bold text-primary mb-2">We also accept bank transfer:</p>
                  <div className="space-y-1 text-muted-foreground">
                    <p><span className="text-white/80">Currency:</span> British Pound (£)</p>
                    <p><span className="text-white/80">Beneficiary:</span> Mercy Oyelowo</p>
                    <p><span className="text-white/80">Sort Code:</span> 04-00-75</p>
                    <p><span className="text-white/80">Account Number:</span> 91187559</p>
                    <p><span className="text-white/80">Bank:</span> Revolut Ltd</p>
                    <p><span className="text-white/80">Address:</span> 30 South Colonnade, E14 5HX, London, United Kingdom</p>
                    <p className="pt-2"><span className="text-white/80">After payment:</span> please send proof via WhatsApp to 07466 705927</p>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-wood-dark py-4 rounded-lg font-bold text-lg hover:bg-golden-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Processing..." : `Pay £${totalPrice.toFixed(2)}`}
                </button>
              </div>
            </form>
          </section>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-wood-light rounded-xl p-6 shadow-md sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6 border-b border-primary/20 pb-4">
              Order Summary ({totalItems} items)
            </h2>
            
            <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between items-start pb-4 border-b border-wood-light/50 last:border-0 last:pb-0">
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{item.name}</h3>
                    <p className="text-sm text-primary">{item.size}</p>
                    <div className="mt-2 inline-flex items-center rounded-lg border border-wood-light bg-wood-dark/60">
                      <button
                        type="button"
                        onClick={() => decrementItem(item.id)}
                        className="p-2 text-white hover:text-primary transition-colors"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-3 py-1 text-white font-bold min-w-[2rem] text-center">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => incrementItem(item.id)}
                        className="p-2 text-white hover:text-primary transition-colors"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-end pl-4">
                    <span className="text-white font-bold mb-2">
                      {typeof item.price === "number" ? `£${(item.price * item.quantity).toFixed(2)}` : 'On Request'}
                    </span>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-primary/20 pt-4 space-y-3">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>£{totalPrice.toFixed(2)}</span>
              </div>
              {method === "delivery" && (
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery (Estimated)</span>
                  <span>£3.00</span>
                </div>
              )}
              <div className="flex justify-between text-xl font-bold text-white pt-2 border-t border-wood-light">
                <span>Total</span>
                <span className="text-primary">
                  £{(totalPrice + (method === "delivery" ? 3 : 0)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
