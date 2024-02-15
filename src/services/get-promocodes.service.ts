import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GetPromocodesService {
  constructor(private http: HttpClient) {}
  url = environment.url;

  getPromocodes() {
    return this.http.get(`${this.url}/promocodes`);
  }
}
