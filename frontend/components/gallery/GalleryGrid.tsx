"use client";

import { useState, useEffect } from "react";
import { ImageRecord } from "@/lib/images";
import { ImageCard } from "./ImageCard";
import { ImageModal } from "./ImageModal";

interface GalleryGridProps {
  images: ImageRecord[];
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [selectedImage, setSelectedImage] = useState<ImageRecord | null>(null);

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

  if (images.length === 0) {
    return (
      <div className="py-20 text-center">
        <div className="w-20 h-20 bg-surface-container mx-auto rounded-full flex items-center justify-center mb-4 text-stone-400">
          <span className="material-symbols-outlined text-4xl">search_off</span>
        </div>
        <h3 className="text-xl font-bold text-on-surface mb-2">No Images Found</h3>
        <p className="text-secondary">Try adjusting your filters to see more results.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {images.map((img, idx) => (
          <ImageCard 
            key={img.src} 
            image={img} 
            index={idx}
            onClick={() => setSelectedImage(img)} 
          />
        ))}
      </div>
      
      <ImageModal 
        image={selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </>
  );
}
