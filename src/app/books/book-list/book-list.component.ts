import { Component, signal, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { BookService } from '../services';
import Book from '../models/book.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
  providers: [BookService],
})
export class BookListComponent implements OnInit {
  private readonly bookService = inject(BookService);
  private readonly router = inject(Router);

  public books = signal<Book[]>([]);
  public success = signal(false);
  public message = signal(false);

  public ngOnInit(): void {
    this.loadBooks();
  }

  private loadBooks(): void {
    this.bookService.getBooks().subscribe({
      next: (response) => {
        this.books.set(response);
      },
      error: (error) => {
        console.error('Error loading books:', error);
      },
    });
  }

  public deleteBook(id: number): void {
    this.bookService.deleteBook(id.toString()).subscribe({
      next: () => {
        this.message.set(true);
        this.success.set(true);
        this.loadBooks();
      },
      error: (error) => {
        console.error('Error deleting book:', error);
      },
    });
  }
}
