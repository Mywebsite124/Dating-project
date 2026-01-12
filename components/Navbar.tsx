
import React from 'react';

const Navbar: React.FC = () => {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="#" onClick={scrollToTop} className="text-2xl font-serif font-bold text-rose-600 tracking-tighter italic">Talk to me</a>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8 text-stone-600 font-medium">
              <a href="#" onClick={scrollToTop} className="hover:text-rose-600 transition-colors">Home</a>
              <a href="#subscriptions" className="hover:text-rose-600 transition-colors">Subscription</a>
              <a href="#gallery" className="hover:text-rose-600 transition-colors">Gallery</a>
              <a 
                href="#subscriptions" 
                className="bg-rose-600 text-white px-5 py-2 rounded-full hover:bg-rose-700 transition-all shadow-md active:scale-95 text-center inline-block"
              >
                Join Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;