import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.component.html',
  styleUrls: ['./list-book.component.css']
})
export class ListBookComponent implements OnInit {

  books: any;

  constructor(private book: BookService, private router: Router) { }

  ngOnInit() {
    this.book.getBooks().subscribe(data  => {
      this.books = data;
		});
  }

	deleteBook(id) {
		this.book.deleteBook(id).subscribe(response => {
      this.router.navigate(['book']);
		});
	}
}
