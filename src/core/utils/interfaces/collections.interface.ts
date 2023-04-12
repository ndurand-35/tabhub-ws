import { Bookmark } from '@/core/utils/interfaces/bookmark.interface';

export enum CollectionType {
  'HOME',
  'TRASH',
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
