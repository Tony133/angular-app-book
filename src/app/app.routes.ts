import { Routes } from '@angular/router';
import { AddBookComponent, EditBookComponent, ListBookComponent } from './books';

export const routes: Routes = [
  { path: 'book/add', component: AddBookComponent },
  { path: 'book/edit/:id', component: EditBookComponent },
  { path: 'book', component: ListBookComponent },
  { path: '', redirectTo: '/book', pathMatch: 'full' },
];
