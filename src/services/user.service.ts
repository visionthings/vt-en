import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(userID: any) {
    return this.http.get(`https://api.vt.com.sa/api/users/${userID}`);
  }
}
