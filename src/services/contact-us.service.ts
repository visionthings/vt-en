import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  constructor(private http: HttpClient) {}
  sendMessage(data: {}) {
    return this.http.post<{}>(
      'https://api.vt.com.sa/api/contact-messages',
      data
    );
  }
}
