import { Routes } from '@angular/router';
import { booksRoutes } from './books/books.routes';

export const routes: Routes = [
  ...booksRoutes,
  { path: '', redirectTo: '/book', pathMatch: 'full' }
];
