import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../service/book.service';
import Book from '../Book';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {

  books: Book[];
  success: boolean = false;

  constructor(private bookService: BookService, private router: Router) { }

  ngOnInit() {
    this.bookService.getBooks().subscribe(response  => {
      this.books = response;
		});
  }

	deleteBook(id): void {
		this.bookService.deleteBook(id).subscribe(response => {
      this.success = true;
      this.router.navigate(['book']);
		});
	}
}
