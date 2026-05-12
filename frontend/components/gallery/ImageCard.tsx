"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ImageRecord } from "@/lib/images";

interface ImageCardProps {
  image: ImageRecord;
  onClick: () => void;
  index: number;
}

export function ImageCard({ image, onClick, index }: ImageCardProps) {
  const isDisease = image.type === 'disease';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.03 }}
      className={`bg-surface-container-lowest rounded-xl overflow-hidden group transition-all duration-300 shadow-sm hover:shadow-2xl border border-transparent ${
        isDisease ? 'hover:shadow-red-500/10 hover:border-red-500/20' : 'hover:shadow-green-500/10 hover:border-green-500/20'
      }`}
    >
      <div className="aspect-[4/3] overflow-hidden relative cursor-pointer" onClick={onClick}>
        <Image 
          src={image.src} 
          alt={image.filename} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 bg-white/90 backdrop-blur-sm text-[10px] font-bold tracking-[0.05rem] uppercase rounded-full border flex items-center gap-1 ${
            isDisease ? 'text-red-600 border-red-600/20' : 'text-green-600 border-green-600/20'
          }`}>
            <span className="material-symbols-outlined text-[12px]">
              {isDisease ? 'warning' : 'eco'}
            </span>
            {isDisease ? (image.diseaseName || 'Disease') : 'Healthy'}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xs font-bold uppercase tracking-widest text-secondary mb-1">
            {image.category} &bull; {isDisease ? (image.diseaseName || 'Disease') : 'Healthy'}
          </h3>
          <div className={`h-1 w-8 rounded-full ${isDisease ? 'bg-red-500' : 'bg-green-500'}`}></div>
        </div>
        
        <button 
          onClick={onClick}
          className="w-full py-3 font-semibold text-sm rounded-lg border border-[#22c55e] bg-transparent text-[#16a34a] transition-all duration-200 ease-in-out hover:bg-[#22c55e] hover:text-white flex items-center justify-center gap-2 group/btn"
        >
          View Full Image
          <span className="material-symbols-outlined text-sm transition-transform group-hover/btn:translate-x-1">
            open_in_full
          </span>
        </button>
      </div>
    </motion.div>
  );
}
