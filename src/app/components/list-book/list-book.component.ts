import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../book/book.interface';
import { BookService } from '../../services/book-service';
import { StoreService } from '../../services/store.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
})
export class ListBookComponent implements OnInit, OnDestroy {

  constructor(
    private bookService: BookService,
    private store: StoreService,
    private router: Router,
  ) {
  }

  books: Book[];
  private destroy$ = new Subject();

  ngOnInit(): void {
    this.bookService.getBooks()
    .pipe(takeUntil(this.destroy$))
    .subscribe(books => this.books = books);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  edit(id, event: Event): void {
    event.preventDefault();
    this.router.navigate([`edit/${id}`]);
  }

}
