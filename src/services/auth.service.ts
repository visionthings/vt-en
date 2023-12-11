import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface User {
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    commercial_number: string;
    address: string;
  };
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(data: any) {
    return this.http.post<User>(
      'https://api.vt.com.sa/api/register',

      data
    );
  }

  public isAuthenticated = new BehaviorSubject(false);

  handleAuth() {
    let token = null;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }

    if (token) {
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  signIn(data: any) {
    return this.http.post<User>(
      'https://api.vt.com.sa/api/login',

      data
    );
  }

  editProfile(data: any) {
    let userID = typeof window !== 'undefined' && localStorage.getItem('id');
    return this.http.put<User>(
      `https://api.vt.com.sa/api/users/${userID}`,

      data
    );
  }
}
