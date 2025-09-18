export type BookStatus = 'Available' | 'Issued';

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  status: BookStatus;
}

export type NewBook = Omit<Book, 'id'>;
