import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookRoutingModule } from './book-routing.module';
import { AddEditBookComponent } from './components/add-edit-book/add-edit-book.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookIssueComponent } from './components/book-issue/book-issue.component';

@NgModule({
  declarations: [
    AddEditBookComponent,
    BookListComponent,
    BookIssueComponent
  ],
  imports: [
    CommonModule,
    BookRoutingModule,
    ReactiveFormsModule
  ]
})
export class BookModule { }