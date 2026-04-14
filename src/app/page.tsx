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
          <span><strong className="text-primary">Delivery & Pickup available.</strong> Doorstep delivery with fee – same-day orders welcome.</span>
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
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 lg:gap-16 py-12">
          <div className="diamond-frame border-[4px] border-primary w-72 h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] shadow-[0_0_18px_rgba(255,204,0,0.35)] bg-wood relative group animate-in zoom-in duration-700 delay-100 flex-shrink-0">
            <Image 
              src="/images/jollof-rice.jpeg" 
              alt="Jollof Rice" 
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          
          <div className="diamond-frame border-[4px] border-primary w-80 h-80 md:w-[28rem] md:h-[28rem] lg:w-[34rem] lg:h-[34rem] shadow-[0_0_28px_rgba(255,204,0,0.65)] overflow-hidden relative group animate-in zoom-in duration-700 z-10 flex-shrink-0">
            <Image 
              src="/images/egusi-soup.jpeg" 
              alt="Egusi Soup" 
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>

          <div className="diamond-frame border-[4px] border-primary w-72 h-72 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] shadow-[0_0_18px_rgba(255,204,0,0.35)] bg-wood relative group animate-in zoom-in duration-700 delay-200 flex-shrink-0">
            <Image 
              src="/images/stewed-chicken.jpg" 
              alt="Peppered Chicken" 
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>

        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 pt-8 pb-12 w-full max-w-2xl mx-auto flex flex-col items-center">
          <p className="text-xl md:text-2xl text-white mb-6 font-medium px-4">Craving something delicious? Order now via WhatsApp and get your meals fresh and hot!</p>
          <a 
            href="https://wa.me/447466705927" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xl font-bold bg-primary text-wood-dark px-12 py-5 rounded-full hover:bg-golden-hover transition-all transform hover:scale-105 shadow-[0_0_25px_rgba(255,204,0,0.6)]"
          >
            Order on WhatsApp 📲
          </a>
          <p className="text-primary font-bold mt-6 text-lg">Order early to avoid missing out ⏳</p>
          
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
          <p className="text-xl text-white font-light leading-relaxed">
            At Matankees Kitchen, we bring people together through flavour. We specialise in freshly prepared, home-style meals inspired by rich cultural traditions and bold, vibrant tastes. Every dish is made with care, quality ingredients, and a passion for creating food that feels like home.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="z-10 w-full bg-wood py-20 relative border-t border-primary/20">
        <div className="container mx-auto px-4 text-center max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12">Why Choose Matankees Kitchen?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-white text-lg">
            <div className="flex flex-col items-center space-y-4 p-8 bg-wood-dark/80 rounded-xl border border-wood-light hover:border-primary/50 transition-colors shadow-lg">
              <CheckCircle className="text-primary w-12 h-12" />
              <span className="font-medium">Freshly prepared daily with quality ingredients</span>
            </div>
            <div className="flex flex-col items-center space-y-4 p-8 bg-wood-dark/80 rounded-xl border border-wood-light hover:border-primary/50 transition-colors shadow-lg">
              <CheckCircle className="text-primary w-12 h-12" />
              <span className="font-medium">Authentic home-style Nigerian recipes</span>
            </div>
            <div className="flex flex-col items-center space-y-4 p-8 bg-wood-dark/80 rounded-xl border border-wood-light hover:border-primary/50 transition-colors shadow-lg">
              <CheckCircle className="text-primary w-12 h-12" />
              <span className="font-medium">Generous portions and rich flavours</span>
            </div>
            <div className="flex flex-col items-center space-y-4 p-8 bg-wood-dark/80 rounded-xl border border-wood-light hover:border-primary/50 transition-colors shadow-lg">
              <CheckCircle className="text-primary w-12 h-12" />
              <span className="font-medium">Reliable delivery and friendly service</span>
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
                We offer pickup in Baldock and doorstep delivery across the UK with a delivery fee. Delivery radius and cost calculated at checkout or via WhatsApp. Same-day orders welcome!
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
                We accept Debit/Credit Cards (secure payment via Stripe) and Bank Transfer.
                <br />
                For bank transfer, please send proof of payment via WhatsApp.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
