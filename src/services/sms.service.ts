import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SmsService {
  constructor(private http: HttpClient) {}

  sendOTP(phone: any) {
    return this.http.get(`https://api.vt.com.sa/api/sms/${phone}`);
  }

  verifyOTP(data: any) {
    return this.http.post(`https://api.vt.com.sa/api/sms`, data);
  }
}
