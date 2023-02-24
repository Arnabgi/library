import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import { BookService } from '../../services/book.service';
@Component({
  selector: 'app-add-edit-book',
  templateUrl: './add-edit-book.component.html',
  styleUrls: ['./add-edit-book.component.css']
})
export class AddEditBookComponent implements OnInit {
  bookForm!:FormGroup;
  bookId:any;
  data:any;
  public hasId = false;
  public bookInfo : Observable<any> | null = this.activatedRoute.paramMap.pipe(
    switchMap((params): any =>{
      this.bookId = params.get('id');
      if(this.bookId){
        this.hasId= true;
      }
        return this.http.view(this.bookId ? this.bookId : '') ;
    })
  );
  constructor(
    private fb: FormBuilder,
    private http: BookService,
    private route: Router,
    public activatedRoute: ActivatedRoute,
  ){

  }
  ngOnInit(): void {
    this.initForm();
    this.patchbookDetails();
  }

  initForm(){
    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      quaintity: ['', Validators.required],
      entryDate: ['', Validators.required],
    })
  }

  createBookDetails(){
    let addBook = this.bookForm.value;
    this.http.create(addBook).subscribe((result) => {
      if(result.status == 200){
        console.log("Book added successfully");
        
        this.route.navigateByUrl('/book/list');
      }
      else{
        console.log("Book added failed");
      }
    })
  }

  patchbookDetails(){
    if(this.bookInfo){
    this.bookInfo.subscribe((result) =>{
      console.log(result);
      this.data = result.data;
      this.bookForm.patchValue({
        name: this.data[0].name || '',
        quaintity:this.data[0].quaintity || '',
        entryDate:this.data[0].entryDate || ''
      });
    })
    }
  }

  editBook(){
    const bookValue = this.bookForm.value;
    this.http.edit(this.bookId,bookValue).subscribe((result) =>{
      if(result){
        alert("data updated successfully");
        this.route.navigateByUrl('/book/list');
      }
      else{
        alert("error");
      }
    })
  }

  back(){
    this.route.navigateByUrl('/book/list');
  }
}
