import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditBookComponent } from './books/edit-book/edit-book.component';
import { AddBookComponent } from './books/add-book/add-book.component';
import { ListBookComponent } from './books/list-book/list-book.component';

const routes: Routes = [
  { path: 'book/add', component: AddBookComponent },
  { path: 'book/edit/:id', component: EditBookComponent },
  { path: 'book', component: ListBookComponent },
  { path: '', redirectTo: '/book', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
