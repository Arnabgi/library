import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ListUserComponent } from './components/list-user/list-user.component';

const routes: Routes = [
  {path:'list',component:ListUserComponent},
  {path:'create',component:AddEditUserComponent},
  {path:'edit/:id',component:AddEditUserComponent},
  {path:'edit-profile',component:EditProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
