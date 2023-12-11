import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class VisitRequestService {
  constructor(private http: HttpClient) {}

  sendVisitRequest(data: any) {
    return this.http.post('https://api.vt.com.sa/api/visit-request', data);
  }
}
