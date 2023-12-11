import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GetPromocodesService {
  constructor(private http: HttpClient) {}
  getPromocodes() {
    return this.http.get('https://api.vt.com.sa/api/promocodes');
  }
}
