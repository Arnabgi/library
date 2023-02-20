import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }
  list() : Observable<any>{
    return this.http.get('http://localhost:5004/library/users');
  }

  login(logData:any) : Observable<any> {
    return this.http.post('http://localhost:5004/library/login',logData);
  }

  create(data:any): Observable<any>{
    return this.http.post('http://localhost:5004/library/user',data);
  }

  delete(id:number) : Observable<any>{
    return this.http.delete('http://localhost:5004/library/user-remove/'+id)
  }

  view(id:number) : Observable<any> {
    return this.http.get('http://localhost:5004/library/user/'+id)
  }

  edit(id:any,data:any) : Observable<any> {
    return this.http.put('http://localhost:5001/library/user/'+id,data);
  }
}
