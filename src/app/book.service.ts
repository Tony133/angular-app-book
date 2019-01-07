import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  endpoint = environment.endpointApi;

  constructor(private http: HttpClient) { }

  addBook(title, price, author) {
    const obj = {
      title: title,
      price: price,
      author: author
    };

    this.http.post(`${this.endpoint}`, obj).subscribe(res => console.log('Create Done'));
  }

  getBooks() {
    return this.http.get(`${this.endpoint}`);
  }

  editBook(id) {
    return this.http.get(`${this.endpoint}/${id}`);
  }

  updateBook(title, price, author, id) {
    const obj = {
      title: title,
      price: price,
      author: author
    };

    this.http.put(`${this.endpoint}/${id}`, obj).subscribe(res => console.log('Update Done'));
  }

	deleteBook(id) {
		return this.http.delete(`${this.endpoint}/${id}`);
	}

}
