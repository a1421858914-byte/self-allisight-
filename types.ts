export enum Category {
  BRAND = 'brand',
  VIDEO = 'video',
  EXHIBITION = 'exhibition'
}

export interface WorkItem {
  id: string;
  title: string;
  category: Category;
  description: string;
  coverBlob: Blob; // The cover image
  fileBlob: Blob;  // The full content (PDF, Image, PPT)
  fileName: string;
  fileType: string;
  createdAt: number;
}

export interface ToastMessage {
  id: number;
  type: 'success' | 'error';
  text: string;
}