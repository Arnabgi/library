import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [
  // {path:'',component:LayoutComponent},
  {path:'', loadChildren:() => import('./models/auth/auth.module').then(m => m.AuthModule)},
  {path:'dashboard',canActivate:[AuthGuard],component:LayoutComponent},
  {path:'user', loadChildren:() => import('./models/user/user.module').then(m => m.UserModule)},
  {path:'book', loadChildren:() => import('./models/book/book.module').then(m => m.BookModule)},
  {path:'**',component:PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
