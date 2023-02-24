import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute,Router } from '@angular/router';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, switchMap } from 'rxjs';
@Component({
  selector: 'app-book-issue',
  templateUrl: './book-issue.component.html',
  styleUrls: ['./book-issue.component.css']
})
export class BookIssueComponent implements OnInit {
  bookWithUserForm!:FormGroup;
  userId:any;
  public bookList!: any;
  // public userInfo : Observable<any> | null = this.activatedRoute.paramMap.pipe(
  //   switchMap((params): any =>{
  //     this.userId = params.get('userId');
  //     return this.userId;
  //   })
  // );
  constructor(
    private fb: FormBuilder,
    private http : BookService,
    private route: Router,
    public activatedRoute: ActivatedRoute,
  ){}
  ngOnInit(): void {
    this.initForm();
    this.list();
  }

  initForm(){
    this.bookWithUserForm = this.fb.group({
      bookId: ['', Validators.required],
      issueDate: ['', Validators.required],
    })
  }

  list(){
    this.http.list().subscribe(result => {
      if(result!=null){
        this.bookList = result.data;
      }
    })
  }

  BookIssue(){
  this.userId =   this.activatedRoute.snapshot.paramMap.get('userId');
  console.log(this.userId);
  let addBookIssue = this.bookWithUserForm.value;
  this.http.issueBook(this.userId,addBookIssue,).subscribe((result:any) => {
    if(result.status == 200){
      console.log("Book Issued successfully");
      
      this.route.navigateByUrl('/book/list');
    }
    else{
      console.log("Book Issued failed");
    }
  })
}
}
