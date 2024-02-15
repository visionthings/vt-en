import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment.development';
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

  url = environment.url;
  register(data: any) {
    return this.http.post<User>(`${this.url}/register`, data);
  }

  sendVerificationMail(data: any) {
    return this.http.post<User>(`${this.url}/email-verification`, data);
  }

  verifyEmail(id: any) {
    return this.http.get(`${this.url}/verify-email/${id}`);
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
      `${this.url}/login`,

      data
    );
  }

  editProfile(data: any) {
    let userID = typeof window !== 'undefined' && localStorage.getItem('id');
    return this.http.put<User>(
      `${this.url}/users/${userID}`,

      data
    );
  }
  getUser(id: any) {
    return this.http.get(`${this.url}/users/${id}`);
  }
}
