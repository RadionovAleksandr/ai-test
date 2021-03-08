export interface Book {
  id?: string;
  title: string;
  image: string;
  description: string;
  publisher: string;
  author: string;
  ISBN: string;
  year: number;
  countPages: number;
  rate: number;
  reviews: object[];
  personalNotes: string;
}
