import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookService } from '../service/book.service';
import { first } from "rxjs/operators";

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  angForm: FormGroup;
  submitted: boolean = false;
  success: boolean = false;
  errorBook: boolean = false;
  book: any = [{}];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      title: ['', Validators.required ],
      price: ['', Validators.required ],
      author: ['', Validators.required ]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bookService.editBook(params['id']).subscribe(response => {
        this.book = response;
      });
    }, err => {
      this.errorBook = true;
    });
  }

  onSubmit() {
    this.submitted = true;
    
    if (this.angForm.invalid) {
      return;
    }

    this.route.params.subscribe(params => {
      this.bookService.updateBook(this.angForm.value, params['id'])
        .pipe(first())
        .subscribe(response => {
          this.router.navigate(['book']);
          this.success = true;
      }, err => {
          this.submitted = false;
          this.errorBook = true;
      });
    }, err => {
      this.errorBook = true;
    });
  }

}
