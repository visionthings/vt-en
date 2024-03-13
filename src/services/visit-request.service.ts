import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class VisitRequestService {
  constructor(private http: HttpClient) {}
  url = environment.url;

  sendVisitRequest(data: any) {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    return this.http.post(`${this.url}/visit-request`, data, {
      headers: new HttpHeaders({ 'api-key': `Bearer ${token}` }),
    });
  }
}
