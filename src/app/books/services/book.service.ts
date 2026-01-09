import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import Book from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private endpoint = environment.endpointApi;

  constructor(private readonly http: HttpClient) {}

  public addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.endpoint, book).pipe(
      catchError((error) => {
        console.error('Error adding book:', error);
        return throwError(() => error);
      })
    );
  }

  public getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.endpoint).pipe(
      catchError((error) => {
        console.error('Error fetching book list:', error);
        return throwError(() => error);
      })
    );
  }

  public getBook(id: number): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.endpoint}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error fetching book with ID ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  public updateBook(book: Book, id: number): Observable<Book> {
    return this.http.put<Book>(`${this.endpoint}/${id}`, book).pipe(
      catchError((error) => {
        console.error(`Error updating book with ID ${id}:`, error);
        return throwError(() => error);
      })
    );
  }

  public deleteBook(id: string): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`).pipe(
      catchError((error) => {
        console.error(`Error deleting book with ID ${id}:`, error);
        return throwError(() => error);
      })
    );
  }
}
