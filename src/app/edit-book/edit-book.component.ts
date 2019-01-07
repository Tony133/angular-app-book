import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookService } from '../book.service';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  angForm: FormGroup;
  book: any = [{}];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private books: BookService,
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
      this.books.editBook(params['id']).subscribe(res => {
        this.book = res;
      });
    });
  }

  updateBook(title, price, author) {
    this.route.params.subscribe(params => {
      this.books.updateBook(title, price, author, params['id']);
      this.router.navigate(['book']);
    });
  }

}
