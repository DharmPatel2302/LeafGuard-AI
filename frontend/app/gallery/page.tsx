import { getAllImages } from "@/lib/images";
import { FilterBar } from "@/components/gallery/FilterBar";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

interface GalleryPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function Gallery({ searchParams }: GalleryPageProps) {
  const params = await searchParams;
  const categoryFilter = params.category?.toLowerCase() || "all";
  const typeFilter = params.type?.toLowerCase() || "all";

  const allImages = getAllImages();
  
  const filteredImages = allImages.filter(img => {
    const matchCategory = categoryFilter === "all" || img.category.toLowerCase() === categoryFilter;
    const matchType = typeFilter === "all" || img.type.toLowerCase() === typeFilter;
    return matchCategory && matchType;
  });

  return (
    <main className="relative z-10 pt-32 pb-24 px-8 w-full max-w-7xl mx-auto flex-grow">
      <div className="grainy-surface fixed inset-0 z-[-1] pointer-events-none"></div>
      
      <header className="mb-16 text-center md:text-left">
        <h1 className="text-5xl md:text-6xl font-extrabold text-on-surface tracking-tighter mb-4">Disease Gallery</h1>
        <p className="text-secondary text-lg max-w-2xl leading-relaxed">Browse all detectable plant diseases across our clinical database of tropical and seasonal cultivars.</p>
      </header>

      <FilterBar />
      
      <GalleryGrid images={filteredImages} />

    </main>
  );
}
