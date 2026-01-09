import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../services';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [BookService],
})
export class AddBookComponent {
  private readonly fb = inject(FormBuilder);
  private readonly bookService = inject(BookService);
  private readonly router = inject(Router);

  public submitted = signal(false);
  public errorBook = signal(false);
  public success = signal(false);

  public form!: FormGroup;

  constructor() {
    this.createForm();
  }

  public createForm(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      author: ['', Validators.required],
    });
  }

  public onSubmit(): void {
    this.submitted.set(true);

    if (this.form.invalid) {
      return;
    }

    this.bookService.addBook(this.form.value).subscribe({
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
