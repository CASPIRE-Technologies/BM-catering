"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string | null;
  featured: boolean;
}

export function GalleryClient({ initialImages }: { initialImages: GalleryItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ["ALL", "CATERING", "EQUIPMENT", "LIGHTING", "WEDDINGS", "CORPORATE"];

  const filtered = initialImages.filter((img) =>
    selectedCategory === "ALL" ? true : img.category.toUpperCase() === selectedCategory
  );

  const currentImage = activeLightboxIndex !== null ? filtered[activeLightboxIndex] : null;

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filtered.length) % filtered.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filtered.length);
    }
  };

  return (
    <div className="space-y-10">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider transition ${
              selectedCategory === cat
                ? "bg-gold-500 text-black shadow-gold font-bold"
                : "bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800"
            }`}
          >
            {cat === "ALL" ? "All Moments" : cat}
          </button>
        ))}
      </div>

      {/* Grid of Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filtered.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setActiveLightboxIndex(index)}
            className="group relative h-72 sm:h-80 rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 hover:border-gold-500/50 cursor-pointer shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <Image
              src={item.imageUrl}
              alt={item.title}
              fill
              className="object-cover group-hover:scale-105 transition duration-700"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-between">
              <div className="self-end p-2 rounded-full bg-zinc-950/70 text-gold-400 border border-zinc-700">
                <Maximize2 className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-gold-400">
                  {item.category}
                </span>
                <h4 className="text-base font-serif font-bold text-white mt-0.5">
                  {item.title}
                </h4>
                {item.description && (
                  <p className="text-xs text-zinc-300 mt-1 line-clamp-1">
                    {item.description}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full-Screen Lightbox Modal */}
      {currentImage && (
        <div
          onClick={() => setActiveLightboxIndex(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
        >
          {/* Close button */}
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700 transition z-50"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Prev/Next */}
          {filtered.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 transition z-50"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 transition z-50"
                aria-label="Next Image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image & Caption Container */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center space-y-4"
          >
            <div className="relative w-full h-[65vh] rounded-2xl overflow-hidden border border-zinc-800 bg-black">
              <Image
                src={currentImage.imageUrl}
                alt={currentImage.title}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="text-center space-y-1 px-4">
              <span className="text-xs uppercase font-bold tracking-widest text-gold-400">
                {currentImage.category} • {activeLightboxIndex! + 1} of {filtered.length}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-white">
                {currentImage.title}
              </h3>
              {currentImage.description && (
                <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto">
                  {currentImage.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
