import { Route } from '@angular/router';

export const booksRoutes: Route[] = [
  {
    path: 'book/add',
    loadComponent: () =>
      import('./add-book/add-book.component').then((m) => m.AddBookComponent)
  },
  {
    path: 'book/edit/:id',
    loadComponent: () =>
      import('./edit-book/edit-book.component').then((m) => m.EditBookComponent)
  },
  {
    path: 'book',
    loadComponent: () =>
      import('./book-list/book-list.component').then((m) => m.BookListComponent)
  }
];
