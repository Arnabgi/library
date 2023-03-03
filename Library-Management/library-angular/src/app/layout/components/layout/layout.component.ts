import { Component } from '@angular/core';
import { UserService } from '../../models/user/service/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  constructor(
    private http : UserService,
    private route: Router
  ){}
  logOut(){
    this.http.logout().subscribe((result) =>{
      if(result.status==200){
        this.route.navigateByUrl('/login');
        alert("Logout successfully");
      }
      else{
        this.route.navigateByUrl('/dashboard');
        alert("Logout Failed!")
      }
    })
  }
}
