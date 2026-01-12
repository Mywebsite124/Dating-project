
import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';

const PhotoGallery: React.FC = () => {
  const { settings } = useAdmin();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const photos = settings.images.map((url, i) => ({
    id: i + 1,
    url: url,
    title: `Moment ${String(i + 1).padStart(2, '0')}`
  }));

  const openLightbox = (url: string) => {
    setSelectedImage(url);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {photos.map((photo) => (
          <div 
            key={photo.id} 
            onClick={() => openLightbox(photo.url)}
            className="relative group overflow-hidden rounded-[2rem] bg-stone-100 shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
          >
            <img 
              src={photo.url} 
              alt={photo.title} 
              className="w-full aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <button className="w-full bg-white/20 backdrop-blur-md border border-white/30 text-white py-2.5 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-rose-600 hover:border-rose-500 transition-colors pointer-events-none">
                <i className="fa-solid fa-expand mr-2"></i> View Moment
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Image Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[110] bg-stone-950/95 flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-6 right-6 text-white text-3xl hover:text-rose-500 transition-colors z-[120]"
            onClick={closeLightbox}
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
          
          <div 
            className="relative max-w-full max-h-full rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage} 
              alt="Full view" 
              className="max-w-full max-h-[85vh] object-contain rounded-3xl"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default PhotoGallery;
