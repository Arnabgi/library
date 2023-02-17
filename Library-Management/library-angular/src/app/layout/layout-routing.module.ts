import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

const routes: Routes = [
  {path:'',component:LayoutComponent},
  {path:'login', loadChildren:() => import('./models/auth/auth.module').then(m => m.AuthModule)},
  {path:'user', loadChildren:() => import('./models/user/user.module').then(m => m.UserModule)}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
