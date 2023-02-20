import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, switchMap } from 'rxjs';
import { UserService } from '../../service/user.service';
@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit,OnDestroy {
  userCreateForm!:FormGroup;
  libraryId:any;
  data:any;
  libraryValue!:Subscription;
  public hasId = false;
  public librayInfo : Observable<any> | null = this.activatedRoute.paramMap.pipe(
    switchMap((params): any =>{
      console.log("param............",params);
      this.libraryId = params.get('id');
      if(this.libraryId){
        this.hasId= true;
      }
        return this.http.view(this.libraryId ? this.libraryId : '') ;
    })
  );
  constructor(
    private fb: FormBuilder,
    private http: UserService,
    private route: Router,
    public activatedRoute: ActivatedRoute,
  ){

  }
  ngOnInit(): void {
    this.initForm();
    this.patchAnswer();
  }

  ngOnDestroy(): void {
    if(this.libraryValue){
      this.libraryValue.unsubscribe();
    }
  }

  initForm(){
    this.userCreateForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required]
    })
  }


  patchAnswer(){
    if(this.librayInfo){
      this.libraryValue = this.librayInfo.subscribe({
        next:(result)=>{
        console.log(result.data);
        this.data = result.data;
        this.userCreateForm.patchValue({
          name: this.data[0].name || '',
          email:this.data[0].email || '',
          phone:this.data[0].phone || ''
        });
      }
    });
    }
  }

  createUser(){
    let addUser = this.userCreateForm.value;
    this.http.create(addUser).subscribe((result) => {
      if(result.status == 200){
        console.log("user added successfully");
        
        this.route.navigateByUrl('/user/list');
      }
      else{
        console.log("user added failed");
      }
    })
  }

  editUser(){
    const userValue = this.userCreateForm.value;
    this.http.edit(this.libraryId,userValue).subscribe((result) =>{
      console.log("result.........",result);
      if(result){
        alert("data updated successfully");
        this.route.navigateByUrl('/user/list');
      }
      else{
        alert("error");
      }
    })
  }
}
