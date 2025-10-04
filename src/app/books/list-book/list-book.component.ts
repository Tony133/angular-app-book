import { Component, OnInit } from "@angular/core";
import { Router, RouterModule } from "@angular/router";
import { BookService } from "../services";
import Book from "../models/book.model";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-list-book",
  templateUrl: "./list-book.component.html",
  styleUrls: ["./list-book.component.css"],
  imports: [CommonModule, RouterModule],
  providers: [BookService]
})
export class ListBookComponent implements OnInit {
  public books: Book[];
  public success: boolean = false;
  public message: boolean = false;

  constructor(
    private readonly bookService: BookService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.bookService.getBooks().subscribe({
      next: (response) => {
        this.books = response;
      }
    });
  }

  public deleteBook(id): void {
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.success = true;
        this.router.navigate(["book"]);
      }
    });
  }
}
