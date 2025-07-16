export interface IBook {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IBorrow {
  _id: string;
  book: string; // Book ID
  quantity: number;
  dueDate: string;
}

export interface IBorrowSummary {
  book: {
    title: string;
  isbn: string;
  }
  totalQuantity: number;
}