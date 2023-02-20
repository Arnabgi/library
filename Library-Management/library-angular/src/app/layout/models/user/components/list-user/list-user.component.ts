import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {
  public userList!: any;
  constructor(
    private http : UserService,
    private route: Router
  ){}
  ngOnInit(): void {
    this.list();
  }

  list(){
    this.http.list().subscribe(result => {
      if(result!=null){
        this.userList = result.data;
      }
    })
  }

  deleteUser(id:number){
    this.http.delete(id).subscribe(result => {
      if(result.status == 200){
        alert("User removed successfully");
        window.location.reload();
      }
      else{
        alert("User removed failed");
      }
    })
  }

  editUser(id:number){
    console.log("id.............",id);
    this.route.navigateByUrl('/user/edit/'+id);
  }
}
