import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("intercepter");

    
      const idToken = localStorage.getItem("id_token");
      if(idToken){
        
        const authReq = req.clone({
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + idToken,
            'Access-Control-Allow-Origin': '*'
          })
        });
    
        return next.handle(authReq);
      } else {
        const authReq = req.clone({
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
          })
        });
    
        return next.handle(authReq);
      }
  }
}

