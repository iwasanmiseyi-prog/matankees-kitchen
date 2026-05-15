"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { useCart } from "@/components/CartProvider";
import { MapPin, Minus, Plus, ShoppingBag, Trash2, Truck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DELIVERY_FEE = 3;

export default function CheckoutPage() {
  const { items, removeFromCart, incrementItem, decrementItem, totalPrice, totalItems } = useCart();
  const [method, setMethod] = useState<"pickup" | "delivery">("pickup");
  const [address, setAddress] = useState("");
  const [instructions, setInstructions] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const deliveryFee = method === "delivery" ? DELIVERY_FEE : 0;
  const grandTotal = useMemo(() => totalPrice + deliveryFee, [totalPrice, deliveryFee]);

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
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, method, address, instructions }),
      });

      if (response.ok) {
        const { url } = await response.json();
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
        <div className="bg-card border border-wood-light rounded-2xl p-12 shadow-xl">
          <ShoppingBag className="mx-auto h-16 w-16 text-primary/50 mb-6" />
          <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Browse the menu and add your favourites.</p>
          <Link
            href="/menu"
            className="inline-flex bg-primary text-wood-dark px-8 py-3 rounded-full font-bold hover:bg-golden-hover transition-colors"
          >
            Browse Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-6xl">
      <div className="mb-8">
        <p className="text-sm text-muted-foreground mb-2">
          <Link href="/menu" className="hover:text-primary transition-colors">
            ← Back to menu
          </Link>
        </p>
        <h1 className="text-4xl md:text-5xl font-black text-primary">Checkout</h1>
        <p className="text-muted-foreground mt-2 max-w-2xl">
          Review your order, choose pickup or delivery, then continue to secure payment.
        </p>
      </div>

      <form onSubmit={handleCheckout} className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-card border border-wood-light rounded-2xl p-6 md:p-8 shadow-lg">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Fulfillment</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setMethod("pickup")}
                className={`rounded-xl border-2 p-5 flex items-start gap-4 text-left transition-colors ${
                  method === "pickup"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-wood-light text-white hover:border-primary/50"
                }`}
              >
                <MapPin className="mt-1" size={22} />
                <div>
                  <div className="font-black text-lg">Pickup</div>
                  <div className="text-sm text-muted-foreground mt-1">Collect from Baldock</div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setMethod("delivery")}
                className={`rounded-xl border-2 p-5 flex items-start gap-4 text-left transition-colors ${
                  method === "delivery"
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-wood-light text-white hover:border-primary/50"
                }`}
              >
                <Truck className="mt-1" size={22} />
                <div>
                  <div className="font-black text-lg">Delivery</div>
                  <div className="text-sm text-muted-foreground mt-1">UK nationwide (fee applies)</div>
                </div>
              </button>
            </div>

            {method === "delivery" && (
              <div className="mt-6 space-y-2">
                <label htmlFor="address" className="block text-sm font-semibold text-white">
                  Delivery address
                </label>
                <textarea
                  id="address"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-wood-dark border border-wood-light rounded-xl p-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none min-h-[120px]"
                  placeholder="Full UK address including postcode"
                />
              </div>
            )}

            <div className="mt-6 space-y-2">
              <label htmlFor="instructions" className="block text-sm font-semibold text-white">
                Special instructions (optional)
              </label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                className="w-full bg-wood-dark border border-wood-light rounded-xl p-3 text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none min-h-[110px]"
                placeholder="Allergies, spice level, delivery notes, etc."
              />
            </div>

            {error && <p className="text-destructive text-sm font-semibold mt-4">{error}</p>}
          </section>

          <section className="bg-card border border-wood-light rounded-2xl p-6 md:p-8 shadow-lg">
            <div className="flex items-end justify-between gap-4 mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">Your basket</h2>
              <span className="text-sm text-muted-foreground">{totalItems} items</span>
            </div>

            <div className="divide-y divide-wood-light/40">
              {items.map((item) => (
                <div key={item.id} className="py-5 flex gap-4">
                  <div className="relative h-20 w-20 rounded-xl overflow-hidden border border-wood-light bg-wood-dark flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <h3 className="text-white font-bold leading-snug">{item.name}</h3>
                        <p className="text-sm text-primary mt-1 font-semibold">{item.size}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                        className="text-muted-foreground hover:text-destructive transition-colors p-2 rounded-lg hover:bg-wood-dark/60"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>

                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <div className="inline-flex items-center rounded-xl border border-wood-light bg-wood-dark/60">
                        <button
                          type="button"
                          onClick={() => decrementItem(item.id)}
                          className="p-3 text-white hover:text-primary transition-colors"
                          aria-label={`Decrease quantity of ${item.name}`}
                        >
                          <Minus size={18} />
                        </button>
                        <span className="px-4 py-2 text-white font-black min-w-[3rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => incrementItem(item.id)}
                          className="p-3 text-white hover:text-primary transition-colors"
                          aria-label={`Increase quantity of ${item.name}`}
                        >
                          <Plus size={18} />
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="text-xs text-muted-foreground">Line total</div>
                        <div className="text-lg font-black text-white">
                          {typeof item.price === "number" ? `£${(item.price * item.quantity).toFixed(2)}` : "On request"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 lg:hidden">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-wood-dark py-4 rounded-xl font-black text-lg hover:bg-golden-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_25px_rgba(255,204,0,0.35)]"
              >
                {loading ? "Processing..." : "Proceed to Secure Payment"}
              </button>
            </div>
          </section>
        </div>

        <aside className="lg:col-span-1">
          <div className="bg-card border border-wood-light rounded-2xl p-6 md:p-7 shadow-lg lg:sticky lg:top-28">
            <h2 className="text-xl font-black text-white mb-6">Order summary</h2>

            <div className="space-y-3 text-muted-foreground">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-white font-semibold">£{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery fee</span>
                <span className="text-white font-semibold">
                  {method === "delivery" ? `£${DELIVERY_FEE.toFixed(2)}` : "£0.00"}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-wood-light flex items-center justify-between">
              <span className="text-white font-black text-lg">Total</span>
              <span className="text-primary font-black text-2xl">£{grandTotal.toFixed(2)}</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="hidden lg:inline-flex w-full mt-8 bg-primary text-wood-dark py-4 rounded-xl font-black text-lg hover:bg-golden-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_25px_rgba(255,204,0,0.35)] justify-center"
            >
              {loading ? "Processing..." : "Proceed to Secure Payment"}
            </button>

            <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
              By continuing, you agree your order details are submitted for fulfilment. You will be redirected to complete
              payment securely online.
            </p>
          </div>
        </aside>
      </form>
    </div>
  );
}
