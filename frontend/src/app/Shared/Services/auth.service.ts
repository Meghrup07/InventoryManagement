import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { LoginRequest, RegisterRequest } from '../Models/auth';
import { map } from 'rxjs';
import { UserResponse } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient)
  apiUrl = "http://localhost:5140/api/Account/"

  currentUser = signal<UserResponse | null>(null);

  login(data: LoginRequest) {
    const url = this.apiUrl + 'login';
    return this.http.post<UserResponse>(url, data).pipe(
      map((user) => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    )
  }

  setCurrentUser(user: UserResponse) {
    localStorage.setItem("user", JSON.stringify(user));
    this.currentUser.set(user);
  }

  register(data: RegisterRequest) {
    const url = this.apiUrl + 'register';
    return this.http.post<UserResponse>(url, data).pipe(
      map((user) => {
        this.setCurrentUser(user);
      })
    )
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }

}
