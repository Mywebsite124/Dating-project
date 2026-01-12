
import React from 'react';
import { useAdmin } from '../context/AdminContext';

const Footer: React.FC = () => {
  const { setView } = useAdmin();

  return (
    <footer className="bg-stone-950 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h2 className="text-3xl font-serif italic text-rose-500 font-bold mb-6">Talk to me</h2>
            <p className="text-stone-400 max-w-sm mb-6">
              Connecting premium hearts through high-quality video and intimate digital experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-rose-600 transition-colors">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-stone-800 flex items-center justify-center hover:bg-rose-600 transition-colors">
                <i className="fa-brands fa-twitter"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-stone-400">
              <li><a href="#" className="hover:text-white transition-colors">About Me</a></li>
              <li><a href="#subscriptions" className="hover:text-white transition-colors">Subscriptions</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Gallery</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6">Legal</h3>
            <ul className="space-y-4 text-stone-400">
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li>
                <button 
                  onClick={() => setView('login')} 
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li><a href="#" className="hover:text-white transition-colors">Refund Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-stone-800 text-center text-stone-500 text-sm">
          <p>© {new Date().getFullYear()} Talk to me Premium. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
