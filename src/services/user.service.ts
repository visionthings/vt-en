import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  url = environment.url;

  getUser(userID: any) {
    return this.http.get(`${this.url}/users/${userID}`);
  }
}
