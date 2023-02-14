export enum CollectionType {
  "HOME",  "TRASH"
}

export interface Collection {
  id: number;
  name: string;
  icon: string;
  collectionType?: CollectionType | null;
  userId: number;
}
