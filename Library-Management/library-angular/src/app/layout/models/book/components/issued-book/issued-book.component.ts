import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, switchMap } from 'rxjs';
@Component({
  selector: 'app-issued-book',
  templateUrl: './issued-book.component.html',
  styleUrls: ['./issued-book.component.css']
})
export class IssuedBookComponent implements OnInit {
  userId: any;
  public bookList!: any;
  constructor(
    private fb: FormBuilder,
    private http : BookService,
    private route: Router,
    public activatedRoute: ActivatedRoute,
  ){}
  ngOnInit(): void {
    this.viewBooks();
  }

  viewBooks(){
    this.userId =   this.activatedRoute.snapshot.paramMap.get('userId');
    this.http.viewBooks(this.userId).subscribe((result:any) => {
        this.bookList = result.data;
        console.log("bookList...........",this.bookList);
    })
  }

  back(){
    this.route.navigateByUrl('/user/list')
  }
}
