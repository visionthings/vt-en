import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  constructor(private http: HttpClient) {}
  url = environment.url;

  // Get contract number
  getContractNumber() {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    return this.http.get(`${this.url}/contracts/number`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }

  // Create new contract
  createContract(contractData: any) {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    return this.http.post(`${this.url}/contracts`, contractData, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }

  // Get contract details by contract number

  getContractDataByNumber(contractNumber: any) {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    return this.http.get(`${this.url}/contracts/search/${contractNumber}`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }
}
