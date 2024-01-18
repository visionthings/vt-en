import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SmsService {
  constructor(private http: HttpClient) {}

  sendOTP(data: any) {
    return this.http.post('https://rest.gateway.sa/api/SendSMS', data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }
}
