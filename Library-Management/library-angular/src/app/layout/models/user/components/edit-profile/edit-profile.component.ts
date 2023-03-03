import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  userEditProfileForm!:FormGroup;
  userValue!:Subscription;
  public userProfileData!: any;
  constructor(
    private fb: FormBuilder,
    private http: UserService,
    private route: Router
  ){}
  ngOnInit(): void {
    this.initForm();
    this.patchUserProfile();
  }

  initForm(){
    this.userEditProfileForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required]
    })
  }

  patchUserProfile(){
    this.http.getProfile().subscribe(result => {
      if(result!=null){
        this.userProfileData = result.data;
        console.log(this.userProfileData);
        this.userEditProfileForm.patchValue({
          name: this.userProfileData[0].name || '',
          phone:this.userProfileData[0].phone || ''
        });
      }
    })
  }

  // editUser(){
  //   const userValue = this.userEditProfileForm.value;
  //   this.http.edit(userValue).subscribe((result) =>{
  //     console.log("result.........",result);
  //     if(result){
  //       alert("data updated successfully");
  //       this.route.navigateByUrl('/user/list');
  //     }
  //     else{
  //       alert("error");
  //     }
  //   })
  // }

  back(){
    this.route.navigateByUrl('/dashboard');
  }
}
