import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Login, LoginToken } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private readonly http: HttpClient
  ) { }

  public login(data: Login): Observable<LoginToken> {
    return this.http
      .post<LoginToken>('/api/auth/login', data);
  }

  public logout(): void { }
}
