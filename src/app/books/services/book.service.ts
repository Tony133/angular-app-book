import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import Book from '../models/book';

@Injectable({
  providedIn: 'root',
})
export class BookService {

  private endpoint = environment.endpointApi;

  constructor(private readonly http: HttpClient) {}

  public addBook(book: Book): Observable<Book[]> {
    return this.http.post<Book[]>(`${this.endpoint}`, book);
  }

  public getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.endpoint}`);
  }

  public editBook(id: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.endpoint}/${id}`);
  }

  public updateBook(book: Book, id: number): Observable<Book[]> {
    return this.http.put<Book[]>(`${this.endpoint}/${id}`, book);
  }

	public deleteBook(id: number): Observable<Book[]> {
		return this.http.delete<Book[]>(`${this.endpoint}/${id}`);
	}
}
