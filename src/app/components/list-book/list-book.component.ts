import { Component, OnInit } from '@angular/core';
import { Book } from '../book/book.interface';
import { BookService } from '../../services/book-service';
import { StoreService } from '../../services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
})
export class ListBookComponent implements OnInit {

  constructor(
    private bookService: BookService,
    private store: StoreService,
    private router: Router,
  ) { }
  books: Book[];

  ngOnInit(): void {
    this.bookService.getBooks()
      .subscribe(books => this.books = books);
  }

  edit(id, event: Event): void {
    event.preventDefault();
    this.router.navigate([`edit/${id}`]);
  }

}
