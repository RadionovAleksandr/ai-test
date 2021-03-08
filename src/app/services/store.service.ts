import { Injectable } from '@angular/core';
import { Book } from '../components/book/book.interface';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  books: Book[] = [];
  constructor() { }
}
