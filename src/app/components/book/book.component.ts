import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../services/book-service';
import { Book } from './book.interface';
import { Observable, Subject } from 'rxjs';
import { ModeEnum } from './book.enum';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})

export class BookComponent implements OnInit, OnDestroy {
  form: FormGroup;
  reviewControls: AbstractControl[]; // todo: костыль, ибо reviews не воспринимается как FormArray
  buttonTitle = 'Сохранить';
  rate = 0;
  image: NzUploadFile; // todo: свой интерфейс
  @Input() private formData: Book;
  private destroy$ = new Subject();
  private mode = ModeEnum.create;

  constructor(
    private bookService: BookService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(undefined),
      title: new FormControl(undefined, Validators.required),
      image: new FormControl(undefined),
      description: new FormControl(undefined, Validators.required),
      author: new FormControl(undefined, Validators.required),
      publisher: new FormControl(undefined, Validators.required),
      ISBN: new FormControl(undefined, Validators.required),
      year: new FormControl(undefined, Validators.required),
      countPages: new FormControl(undefined, Validators.required),
      rate: new FormControl(undefined),
      reviews: new FormArray([]),
      personalNotes: new FormControl(undefined),
    });
    this.reviewControls = (this.form.get('reviews') as FormArray).controls;

    if (this.formData) {
      this.mode = ModeEnum.edit;
      // tslint:disable-next-line:no-unused-expression
      this.form.disable();
      this.buttonTitle = 'Сохранить изменения';
      this.rate = this.formData.rate;
      this.form.patchValue(this.formData);
      this.image = this.formData.image as unknown as NzUploadFile;

      this.formData.reviews.forEach((item, index) => {
        const control = new FormControl(item, Validators.required);
        control.disable();
        (this.form.get('reviews') as FormArray).setControl(index, control);
      });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isDisabled(): boolean {
    return !(this.mode === ModeEnum.create || this.mode === ModeEnum.change);
  }

  addField(e: Event): void {
    if (e) {
      e.preventDefault();
    }
    const control = new FormControl('', Validators.required);
    (this.form.get('reviews') as FormArray).push(control);
  }

  submitForm(formData: Book): void {
    // tslint:disable-next-line:forin
    for (const key in this.form.controls) {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    }
    this.defineFlow(formData).pipe(takeUntil(this.destroy$)).subscribe(() => this.router.navigate(['']));
  }

  defineFlow(formData): Observable<Book> {
    return formData.id ? this.bookService.editBook(formData.id, formData) : this.bookService.addBook(formData);
  }

  enableForm(e: Event): void {
    if (e) {
      e.preventDefault();
    }
    this.form.enable();
    this.mode = ModeEnum.change;
    // tslint:disable-next-line:forin
    for (const key in this.form.controls) {
      this.form.controls[key].markAsPristine();
      this.form.controls[key].updateValueAndValidity();
    }
  }

  changeRate(event: Event): void {
    this.form.get('rate').setValue(event);
    event.preventDefault();
  }

  isCreateMode(): boolean {
    return this.mode === ModeEnum.create;
  }

  changeImage(image: NzUploadFile): void {
    this.form.get('image').setValue(image);
  }
}
