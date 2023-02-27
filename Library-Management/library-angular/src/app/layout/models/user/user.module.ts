import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { ListUserComponent } from './components/list-user/list-user.component';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ListUserComponent,
    AddEditUserComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,ReactiveFormsModule
  ],
  providers: [
  ]
})
export class UserModule { }
