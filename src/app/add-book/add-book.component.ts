import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  angForm: FormGroup;
  submitted: boolean = false;
  errorBook: boolean = true;
  success: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private bookService: BookService, 
    private router: Router
  ) {
    this.createForm();
  }

  createForm() {
    this.angForm = this.fb.group({
      title: ['', Validators.required ],
      price: ['', Validators.required ],
      author: ['', Validators.required ],
    });
  }
  
  onSubmit() {
    this.submitted = true;
    
    if (this.angForm.invalid) {
      return;
    }

    this.bookService.addBook(this.angForm.value)
      .subscribe(response => {
        this.success = true;
        this.router.navigate(['book']);
      }, err => {
        this.submitted = false;
        this.errorBook = true;
      });
  }

  ngOnInit() {

  }
}
