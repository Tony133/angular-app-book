import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  angForm: FormGroup;
  constructor(private fb: FormBuilder, private book: BookService, private router: Router) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      title: ['', Validators.required ],
      price: ['', Validators.required ],
      author: ['', Validators.required ],
    });
  }

  addBook(title, price, author) {
    this.book.addBook(title, price, author);
    this.router.navigate(['book']);
  }

  ngOnInit() {
  }

}
