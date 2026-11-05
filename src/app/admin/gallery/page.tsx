"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Images, Plus, Trash2, X } from "lucide-react";

export default function AdminGalleryPage() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        if (data.images) setImages(data.images);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold text-white flex items-center gap-2">
          <Images className="w-6 h-6 text-gold-400" />
          <span>Website Gallery Manager</span>
        </h1>
        <p className="text-xs text-zinc-400 mt-1">
          Photos displayed in the public portfolio and homepage highlights.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img.id} className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden space-y-2 p-3">
            <div className="relative h-44 rounded-xl overflow-hidden bg-zinc-800">
              <Image src={img.imageUrl} alt={img.title} fill className="object-cover" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase text-gold-400">{img.category}</span>
              <p className="text-xs font-semibold text-zinc-200 truncate">{img.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
