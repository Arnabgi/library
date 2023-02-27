import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditUserComponent } from './components/add-edit-user/add-edit-user.component';
import { ListUserComponent } from './components/list-user/list-user.component';

const routes: Routes = [
  {path:'list',component:ListUserComponent},
  {path:'create',component:AddEditUserComponent},
  {path:'edit/:id',component:AddEditUserComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
