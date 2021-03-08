import { Injectable } from '@angular/core';
import { StoreService } from './store.service';
import { Book } from '../components/book/book.interface';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class BookService {

  constructor(private store: StoreService) {
  }

  addBook(book: Book): Observable<Book> {
    if (!book.id) {
      book.id = String(Math.random());
    }
    return of(book).pipe(
      tap(() => this.store.books.push(book)),
    );
  }

  getBooks(): Observable<Book[]> {
    return of(this.store.books);
  }

  getBook(id: string): Observable<Book> {
    return of((this.store.books as Book[]).find(book => book.id === id));
  }


  editBook(id: string, newBook: Book): Observable<Book> {
     of().pipe(map(() => {
      for (let i = 0; i < this.store.books.length; i++) {
        if (this.store.books[i].id === id) {
          this.store.books[i] = newBook;
          break;
        }
      }
    }));
     return of(newBook);
  }

}
