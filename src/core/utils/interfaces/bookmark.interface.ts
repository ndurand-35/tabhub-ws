import { Collection } from '@/core/utils/interfaces/collections.interface';

export interface Bookmark {
  id: number;
  title: string;
  link: string;
  description: string;
  imagePath: string;
  imageLink?: string;
  website: string;
  collectionId: number;
  collection?: Collection;
}
