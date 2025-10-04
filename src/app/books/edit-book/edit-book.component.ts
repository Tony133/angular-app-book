import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BookService } from "../services";
import { first } from "rxjs/operators";
import Book from "../models/book";

@Component({
  selector: "app-edit-book",
  templateUrl: "./edit-book.component.html",
  styleUrls: ["./edit-book.component.css"],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [BookService]
})
export class EditBookComponent implements OnInit {
  public form: FormGroup;
  public submitted: boolean = false;
  public success: boolean = false;
  public errorBook: boolean = false;
  public book: Book[] = [];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly bookService: BookService,
    private readonly fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      author: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.route.params.subscribe({
      next: (params) => {
        this.bookService.editBook(params["id"]).subscribe((response) => {
          this.book = response;
        });
      },
      error: (err) => {
        this.errorBook = true;
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.route.params.subscribe({
      next: (params) => {
        this.bookService
          .updateBook(this.form.value, params['id'])
          .pipe(first())
          .subscribe({
            next: (response) => {
              this.router.navigate(['book']);
              this.success = true;
            },
            error: (err) => {
              this.submitted = false;
              this.errorBook = true;
            }
          });
      },
      error: (err) => {
        this.errorBook = true;
      }
    });
  }
}
