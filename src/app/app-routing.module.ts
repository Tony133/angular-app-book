import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBookComponent, EditBookComponent, ListBookComponent } from './books';

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
