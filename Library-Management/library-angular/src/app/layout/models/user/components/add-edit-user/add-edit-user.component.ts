import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { UserService } from '../../service/user.service';
@Component({
  selector: 'app-add-edit-user',
  templateUrl: './add-edit-user.component.html',
  styleUrls: ['./add-edit-user.component.css']
})
export class AddEditUserComponent implements OnInit {
  userCreateForm!:FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: UserService,
    private route: Router,
    public activatedRoute: ActivatedRoute,
  ){

  }
  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.userCreateForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      phone: ['', Validators.required]
    })
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
}
