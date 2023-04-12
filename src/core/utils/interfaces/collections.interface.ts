import { Bookmark } from '@/core/utils/interfaces/bookmark.interface';

export enum CollectionType {
  HOME = 'HOME',
  TRASH = 'TRASH',
}

export interface Collection {
  id: number;
  name: string;
  icon: string;
  collectionType?: CollectionType | null;
  parentId?: number | null;
  userId: number;
  bookmarks?: Array<Bookmark>;
}
