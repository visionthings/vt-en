import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class VisitRequestService {
  constructor(private http: HttpClient) {}
  url = environment.url;

  sendVisitRequest(data: any) {
    return this.http.post(`${this.url}/visit-request`, data);
  }
}
