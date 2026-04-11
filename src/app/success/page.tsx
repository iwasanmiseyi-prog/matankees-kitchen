import React from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function SuccessPage() {
  return (
    <div className="container mx-auto px-4 py-24 text-center max-w-lg">
      <div className="bg-card border border-wood-light rounded-xl p-12 shadow-xl animate-in zoom-in duration-500">
        <CheckCircle className="mx-auto h-20 w-20 text-primary mb-6 animate-pulse" />
        <h2 className="text-3xl font-bold text-white mb-4">Order Confirmed!</h2>
        <p className="text-muted-foreground mb-8 text-lg">
          Thank you for ordering from MATANKEES Kitchen. We have received your order and are preparing your delicious meals.
        </p>
        <p className="text-primary italic mb-8 border-t border-wood-light pt-6">
          "Flavour That Feels Like Home"
        </p>
        <Link href="/" className="bg-wood-dark border border-primary text-primary px-8 py-3 rounded-full font-bold hover:bg-primary hover:text-wood-dark transition-colors">
          Return Home
        </Link>
      </div>
    </div>
  );
}
