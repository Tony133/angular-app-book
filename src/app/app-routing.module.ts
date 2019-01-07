import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditBookComponent } from './edit-book/edit-book.component';
import { AddBookComponent } from './add-book/add-book.component';
import { ListBookComponent } from './list-book/list-book.component';

const routes: Routes = [
  { path: 'book/add', component: AddBookComponent },
  { path: 'book/edit/:id', component: EditBookComponent },
  { path: 'book', component: ListBookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
