import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
import { BookService } from '../../services/book-service';
import { Subject } from 'rxjs';
import { Book } from '../../components/book/book.interface';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
})
export class EditBookComponent implements OnInit, OnDestroy {

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
  ) { }

  public book: Book;
  private destroy$ = new Subject();

  ngOnInit(): void {
    this.route.paramMap.pipe(
      takeUntil(this.destroy$),
      switchMap((param: ParamMap) => this.bookService.getBook(param.get('id'))),
    ).subscribe(book => this.book = book);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
