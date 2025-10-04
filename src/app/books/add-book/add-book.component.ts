import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";
import { BookService } from "../services";

@Component({
  selector: "app-add-book",
  templateUrl: "./add-book.component.html",
  styleUrls: ["./add-book.component.css"],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [BookService]
})
export class AddBookComponent implements OnInit {
  public form: FormGroup;
  public submitted: boolean = false;
  public errorBook: boolean = false;
  public success: boolean = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly bookService: BookService,
    private readonly router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      title: ["", Validators.required],
      price: ["", Validators.required],
      author: ["", Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.bookService.addBook(this.form.value).subscribe({
      next: (response) => {
        this.success = true;
        this.router.navigate(["book"]);
      },
      error: (err) => {
        this.submitted = false;
        this.errorBook = true;
      }
    });
  }

  ngOnInit() {}
}
