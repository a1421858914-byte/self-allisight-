export enum Category {
  BRAND = 'brand',
  VIDEO = 'video',
  TRAINING = 'training',
  EXHIBITION = 'exhibition'
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: Category;
  client?: string;
  description: string;
  tags: string[];
  cover: string; // Thumbnail image
  images: string[]; // Array of images for the carousel
  videoUrl?: string; // Optional video URL
  awards?: string[];
}