import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  constructor(private http: HttpClient) {}
  url = environment.url;

  // Get contract number
  getContractNumber() {
    return this.http.get(`${this.url}/contracts/number`);
  }

  // Create new contract
  createContract(contractData: any) {
    return this.http.post(`${this.url}/contracts`, contractData);
  }
}
