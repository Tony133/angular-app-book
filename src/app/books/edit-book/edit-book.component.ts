import { Component, signal, inject, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { BookService } from '../services';
import { first } from 'rxjs/operators';
import Book from '../models/book.model';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [BookService],
})
export class EditBookComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly bookService = inject(BookService);
  private readonly fb = inject(FormBuilder);

  public submitted = signal(false);
  public success = signal(false);
  public errorBook = signal(false);
  public book = signal<Book | null>(null);
  public isLoading = signal(true);

  public form!: FormGroup;
  private bookId: number | null = null;

  constructor() {
    this.createForm();

    effect(() => {
      const bookData = this.book();
      if (bookData) {
        this.form.patchValue({
          title: bookData.title,
          price: bookData.price,
          author: bookData.author,
        });
      }
    });
  }

  public createForm(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      author: ['', Validators.required],
    });
  }

  public ngOnInit(): void {
    this.route.params.pipe(first()).subscribe({
      next: (params) => {
        this.bookId = +params['id'];
        this.loadBook(this.bookId);
      },
      error: () => {
        this.errorBook.set(true);
        this.isLoading.set(false);
      },
    });
  }

  private loadBook(id: number): void {
    this.bookService.getBook(id).subscribe({
      next: (response) => {
        if (Array.isArray(response) && response.length > 0) {
          this.book.set(response[0]);
        } else {
          this.book.set(response as any);
        }
        this.isLoading.set(false);
      },
      error: () => {
        this.errorBook.set(true);
        this.isLoading.set(false);
      },
    });
  }

  public onSubmit(): void {
    this.submitted.set(true);

    if (this.form.invalid || this.bookId === null) {
      return;
    }

    this.bookService
      .updateBook(this.form.value, this.bookId)
      .pipe(first())
      .subscribe({
        next: () => {
          this.success.set(true);
          this.router.navigate(['book']);
        },
        error: () => {
          this.submitted.set(false);
          this.errorBook.set(true);
        },
      });
  }
}
