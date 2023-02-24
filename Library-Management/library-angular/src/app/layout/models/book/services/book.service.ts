import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(
    private http: HttpClient
  ) { }

  create(data:any): Observable<any>{
    return this.http.post('http://localhost:5004/library/book',data);
  }

  list() : Observable<any>{
    return this.http.get('http://localhost:5004/library/books');
  }

  delete(id:number) : Observable<any>{
    return this.http.delete('http://localhost:5004/library/book/'+id)
  }

  view(id:number) : Observable<any> {
    return this.http.get('http://localhost:5004/library/book/'+id)
  }

  edit(id:any,data:any) : Observable<any> {
    return this.http.put('http://localhost:5004/library/book/'+id,data);
  }

  issueBook(userId:any,data:any){
    return this.http.post('http://localhost:5004/library/user-book/'+userId,data);
  }
}
