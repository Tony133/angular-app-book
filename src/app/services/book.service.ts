import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import Book from './../Book';
 
@Injectable({
  providedIn: 'root'
})
export class BookService {

  endpoint = environment.endpointApi;

  constructor(private http: HttpClient) { }

  addBook(book: Book): Observable<Book[]> {
    return this.http.post<Book[]>(`${this.endpoint}`, book);
  }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.endpoint}`);
  }

  editBook(id: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.endpoint}/${id}`);
  }

  updateBook(book: Book, id: number): Observable<Book[]> {
    return this.http.put<Book[]>(`${this.endpoint}/${id}`, book);
  }

	deleteBook(id: number): Observable<Book[]> {
		return this.http.delete<Book[]>(`${this.endpoint}/${id}`);
	}
}
