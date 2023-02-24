import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  public bookList!: any;
  constructor(
    private http : BookService,
    private route: Router
  ){}
  ngOnInit(): void {
    this.list();
  }

  list(){
    this.http.list().subscribe(result => {
      if(result!=null){
        this.bookList = result.data;
      }
    })
  }

  deleteBook(id:number){
    this.http.delete(id).subscribe(result => {
      if(result.status == 200){
        alert("User removed successfully");
        window.location.reload();
      }
      else{
        alert("User removed failed");
      }
    })
  }

  editBook(id:number){
    this.route.navigateByUrl('/book/edit/'+id);
  }
}
