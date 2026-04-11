import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Star, CheckCircle, Info } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative flex flex-col items-center justify-center overflow-hidden">
      {/* Background with Bokeh Effect */}
      <div 
        className="absolute inset-0 z-0 bg-wood"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255, 204, 0, 0.15) 0%, transparent 40%),
                            radial-gradient(circle at 80% 70%, rgba(255, 204, 0, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 50% 50%, rgba(255, 204, 0, 0.05) 0%, transparent 60%)`
        }}
      />

      {/* Hero Section */}
      <div className="z-10 container mx-auto flex flex-col items-center text-center space-y-10 py-12 px-4">
        
        {/* Delivery Info Banner */}
        <div className="bg-primary/20 border border-primary text-white px-6 py-3 rounded-full flex items-center space-x-3 text-sm md:text-base animate-in slide-in-from-top-4 duration-700 backdrop-blur-sm shadow-[0_0_15px_rgba(255,204,0,0.1)]">
          <Info className="text-primary w-5 h-5 flex-shrink-0" />
          <span><strong className="text-primary">Delivery & Pickup</strong> in Baldock SG7 area only. Same-day orders welcome.</span>
        </div>

        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 pt-8">
          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-primary drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] uppercase">
            MATANKEES
          </h1>
          <p 
            className="text-3xl md:text-4xl text-primary font-medium drop-shadow-md pb-2"
            style={{ fontFamily: "'Brush Script MT', 'Dancing Script', cursive" }}
          >
            Flavour That Feels Like Home
          </p>
        </div>

        {/* Featured Diamond Images */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 py-8">
          <div className="diamond-frame border-[4px] border-primary w-48 h-48 md:w-64 md:h-64 shadow-[0_0_15px_rgba(255,204,0,0.3)] bg-wood relative group animate-in zoom-in duration-700 delay-100 mt-12">
            <Image 
              src="https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&q=80&w=400&h=400" 
              alt="Jollof Rice" 
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          
          <div className="diamond-frame border-[4px] border-primary w-56 h-56 md:w-72 md:h-72 shadow-[0_0_20px_rgba(255,204,0,0.5)] overflow-hidden relative group animate-in zoom-in duration-700 z-10">
            <Image 
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=500&h=500" 
              alt="Stews" 
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div className="diamond-frame border-[4px] border-primary w-48 h-48 md:w-64 md:h-64 shadow-[0_0_15px_rgba(255,204,0,0.3)] bg-wood relative group animate-in zoom-in duration-700 delay-200 mt-12">
            <Image 
              src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=400&h=400" 
              alt="Peppered Chicken" 
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 pt-8 pb-12">
          <Link 
            href="/menu" 
            className="inline-flex items-center text-xl font-bold bg-primary text-wood-dark px-12 py-5 rounded-full hover:bg-golden-hover transition-all transform hover:scale-105 shadow-[0_0_25px_rgba(255,204,0,0.6)]"
          >
            ORDER NOW
            <ArrowRight className="ml-2" size={24} />
          </Link>
          
          <div className="flex items-center justify-center mt-8 space-x-2 text-white">
            <Star className="text-primary fill-primary" size={20} />
            <Star className="text-primary fill-primary" size={20} />
            <Star className="text-primary fill-primary" size={20} />
            <Star className="text-primary fill-primary" size={20} />
            <Star className="text-primary fill-primary" size={20} />
            <span className="ml-2 font-medium">Authentic Nigerian Cuisine</span>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="z-10 w-full bg-wood-dark/90 border-t border-primary/20 py-20 relative">
        <div className="container mx-auto px-4 text-center max-w-4xl space-y-8">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">About Us</h2>
          <p className="text-xl md:text-2xl text-white font-light leading-relaxed">
            Experience authentic Nigerian home-style food right here in <span className="font-bold text-primary">Baldock, UK</span>. 
            We put our heart and heritage into every pot of soup, bringing you the true taste of West Africa.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 text-white text-lg">
            <div className="flex flex-col items-center space-y-3 p-6 bg-wood/50 rounded-xl border border-wood-light hover:border-primary/50 transition-colors">
              <CheckCircle className="text-primary" size={32} />
              <span className="font-medium">Delivery & Pickup in SG7</span>
            </div>
            <div className="flex flex-col items-center space-y-3 p-6 bg-wood/50 rounded-xl border border-wood-light hover:border-primary/50 transition-colors">
              <CheckCircle className="text-primary" size={32} />
              <span className="font-medium">Catering for Events</span>
            </div>
            <div className="flex flex-col items-center space-y-3 p-6 bg-wood/50 rounded-xl border border-wood-light hover:border-primary/50 transition-colors">
              <CheckCircle className="text-primary" size={32} />
              <span className="font-medium">Corporate Lunches</span>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="z-10 w-full bg-wood py-20 relative border-t border-wood-light">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-wood-dark/60 border border-wood-light rounded-xl p-6 hover:border-primary/30 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">How does delivery work?</h3>
              <p className="text-muted-foreground leading-relaxed">
                We currently offer delivery exclusively to Baldock and the surrounding SG7 postcode areas. 
                Same-day orders are welcome! You can select delivery at checkout. Alternatively, you can always choose to pick up your order directly from us in Baldock.
              </p>
            </div>
            
            <div className="bg-wood-dark/60 border border-wood-light rounded-xl p-6 hover:border-primary/30 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">Is there a minimum order?</h3>
              <p className="text-muted-foreground leading-relaxed">
                There is no strict minimum order for our regular menu items! However, please note that some specialized snacks (like Akara or Meatpies) have custom minimum batch sizes, and a few select items require 24-48 hours notice.
              </p>
            </div>
            
            <div className="bg-wood-dark/60 border border-wood-light rounded-xl p-6 hover:border-primary/30 transition-colors">
              <h3 className="text-xl font-bold text-white mb-3">What payment methods do you accept?</h3>
              <p className="text-muted-foreground leading-relaxed">
                We securely accept all major credit and debit cards online during the checkout process via our payment partner, Stripe.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
