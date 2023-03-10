import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StorageService} from "./storage.service";
import {Router} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(
    private router:Router,
    private storage:StorageService
  ) { }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
      const token =  localStorage.getItem("token") && localStorage.getItem("token")!=null ? localStorage.getItem("token") :'';
      req = req.clone({
      headers: req.headers.set(
          "Authorization",
          token ? "bearer "+token : ''  
      ),
      });
   return next.handle(req);
  }
  
}
