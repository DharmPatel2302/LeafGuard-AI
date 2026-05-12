import fs from 'fs';
import path from 'path';

export type PlantType = 'healthy' | 'disease';

export interface ImageRecord {
  src: string;
  category: string;
  type: PlantType;
  diseaseName: string | null;
  filename: string;
}

export function getAllImages(): ImageRecord[] {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  const records: ImageRecord[] = [];

  if (!fs.existsSync(imagesDir)) {
    console.warn(`Directory not found: ${imagesDir}`);
    return [];
  }

  // Read top-level category folders (e.g., banana, guava)
  const categories = fs.readdirSync(imagesDir).filter(file => {
    return fs.statSync(path.join(imagesDir, file)).isDirectory();
  });

  for (const category of categories) {
    const categoryPath = path.join(imagesDir, category);
    const files = fs.readdirSync(categoryPath).filter(file => file.match(/\.(jpg|jpeg|png|webp)$/i));

    for (const filename of files) {
      const isHealthy = filename.includes('healthy');
      const isDisease = filename.includes('disease');
      
      let type: PlantType = 'healthy'; // default
      let diseaseName: string | null = null;

      if (isDisease) {
        type = 'disease';
        // Match things like 'disease_rust' or 'disease__black_sigatoka'
        const match = filename.match(/disease_+(.+)\.[^.]+$/i);
        if (match && match[1]) {
          diseaseName = match[1]
            .split(/_+/)
            .filter(Boolean)
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        }
      } else if (!isHealthy) {
        // Fallback guess if neither explicit label is present
        type = 'healthy'; 
      }

      records.push({
        src: `/images/${category}/${filename}`,
        category: category,
        type: type,
        diseaseName,
        filename
      });
    }
  }

  return records;
}
