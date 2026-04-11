"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, Menu, X, Phone, Mail } from "lucide-react";
import { useCart } from "./CartProvider";
import { useState } from "react";

export function Header() {
  const { totalItems } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Contact Bar */}
      <div className="bg-primary text-wood-dark py-1.5 px-4 text-xs md:text-sm font-semibold flex justify-center md:justify-end items-center space-x-6">
        <a href="tel:07466705927" className="flex items-center hover:text-white transition-colors">
          <Phone size={14} className="mr-2" />
          07466 705927
        </a>
        <a href="mailto:matankees@gmail.com" className="flex items-center hover:text-white transition-colors">
          <Mail size={14} className="mr-2" />
          matankees@gmail.com
        </a>
      </div>

      <header className="sticky top-0 z-50 bg-wood/95 backdrop-blur-sm border-b border-primary/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary tracking-tight">
            MATANKEES <span className="text-white">Kitchen</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link href="/" className="hover:text-primary transition-colors text-white">Home</Link>
            <Link href="/menu" className="hover:text-primary transition-colors text-white">Menu</Link>
            <Link href="/checkout" className="hover:text-primary transition-colors text-white">Checkout</Link>
            
            <Link href="/checkout" className="relative flex items-center justify-center p-2 rounded-full bg-wood-light hover:bg-wood transition-colors border border-primary/20">
              <ShoppingBag size={20} className="text-primary" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                  {totalItems}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center space-x-4">
            <Link href="/checkout" className="relative p-2">
              <ShoppingBag size={24} className="text-primary" />
              {totalItems > 0 && (
                <span className="absolute 0 top-0 right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full shadow-md">
                  {totalItems}
                </span>
              )}
            </Link>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-primary">
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden bg-wood-dark border-t border-primary/20 flex flex-col p-4 space-y-4 shadow-lg absolute w-full left-0 z-50">
            <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-lg text-white hover:text-primary p-2">Home</Link>
            <Link href="/menu" onClick={() => setMobileMenuOpen(false)} className="text-lg text-white hover:text-primary p-2">Menu</Link>
            <Link href="/checkout" onClick={() => setMobileMenuOpen(false)} className="text-lg text-white hover:text-primary p-2">Checkout</Link>
            
            <div className="border-t border-wood-light pt-4 flex flex-col space-y-3">
              <a href="tel:07466705927" className="flex items-center text-primary p-2">
                <Phone size={18} className="mr-3" />
                07466 705927
              </a>
              <a href="mailto:matankees@gmail.com" className="flex items-center text-primary p-2">
                <Mail size={18} className="mr-3" />
                matankees@gmail.com
              </a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
