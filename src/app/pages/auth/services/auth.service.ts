import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login.interface';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiResponse } from 'src/app/commons/response.interface';
import { environment as env } from 'src/environments/environment';
import { endpoint, httpOptions } from '@shared/apis/endpoint';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: BehaviorSubject<ApiResponse>;

  public get userToken(): ApiResponse{
    return this.user.value;
  }

  constructor(private http: HttpClient) { 
    this.user = new BehaviorSubject<ApiResponse>(JSON.parse(localStorage.getItem("token")))
  }

  login(req: Login): Observable<ApiResponse>{
    const requestUrl = `${env.api}${endpoint.GENERATE_TOKEN}`
    return this.http.post<ApiResponse>(requestUrl, req, httpOptions).pipe(
      map((res:ApiResponse) => {
        if(res.isSuccess){
          localStorage.setItem("token", JSON.stringify(res.data));
          this.user.next(res.data);
        }
        return res;
      })
    );
  }
}
