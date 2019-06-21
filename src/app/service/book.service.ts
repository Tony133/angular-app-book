import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  endpoint = environment.endpointApi;

  constructor(private http: HttpClient) { }

  addBook(title, price, author) {
    const data = {
      title: title,
      price: price,
      author: author
    };

    this.http.post(`${this.endpoint}`, data).subscribe(res => console.log('Create Done'));
  }

  getBooks() {
    return this.http.get(`${this.endpoint}`);
  }

  editBook(id) {
    return this.http.get(`${this.endpoint}/${id}`);
  }

  updateBook(title, price, author, id) {
    const data = {
      title: title,
      price: price,
      author: author
    };

    this.http.put(`${this.endpoint}/${id}`, data).subscribe(res => console.log('Update Done'));
  }

	deleteBook(id) {
		return this.http.delete(`${this.endpoint}/${id}`);
	}

}
