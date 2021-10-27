import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class UserService {

  private todoSubject: Subject<boolean> = new Subject<boolean>()


  constructor(
    private readonly http: HttpClient
  ) { }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>('/api/users');
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`);
  }

  save(user: User): Observable<User> {
    console.log(user.id);

    if (user.id) {
      return this.http.put<User>('/api/users', user);
    } else {
      return this.http.post<User>('/api/users', user);
    }
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`/api/users/${id}`);
  }

  public isListUpdated(): Observable<boolean> {
    return this.todoSubject.asObservable()
  }
}
