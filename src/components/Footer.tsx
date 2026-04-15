import React from "react";
import Link from "next/link";
import { Instagram, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-wood-dark text-foreground py-10 mt-20 border-t border-wood-light">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold text-primary mb-4">MATANKEES Kitchen</h3>
          <p className="italic text-muted-foreground mb-4">"Flavour That Feels Like Home"</p>
          <div className="flex space-x-4">
            <Link href="https://instagram.com" target="_blank" className="text-foreground hover:text-primary transition-colors">
              <Instagram size={24} />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-bold text-primary mb-4">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-center space-x-3">
              <Phone className="text-primary" size={20} />
              <a href="tel:07466705927" className="hover:text-primary transition-colors">
                07466 705927
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="text-primary" size={20} />
              <a href="mailto:matankees@gmail.com" className="hover:text-primary transition-colors">
                matankees@gmail.com
              </a>
            </li>
            <li className="flex items-center space-x-3">
              <MapPin className="text-primary" size={20} />
              <span>Baldock, UK (Nationwide Delivery)</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-10 pt-6 border-t border-wood-light text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} MATANKEES Kitchen. All rights reserved.
      </div>
    </footer>
  );
}
