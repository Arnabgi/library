import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditBookComponent } from './components/add-edit-book/add-edit-book.component';
import { BookIssueComponent } from './components/book-issue/book-issue.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { IssuedBookComponent } from './components/issued-book/issued-book.component';
const routes: Routes = [
  {path: 'create',component: AddEditBookComponent},
  {path: 'edit/:id',component: AddEditBookComponent},
  {path: 'list',component: BookListComponent},
  {path: 'book-issue/:userId',component: BookIssueComponent},
  {path: 'show-books/:userId',component: IssuedBookComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
