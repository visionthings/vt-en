import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  constructor(private http: HttpClient) {}
  url = environment.url;
  sendMessage(data: {}) {
    return this.http.post<{}>(`${this.url}/messages`, data);
  }
}
