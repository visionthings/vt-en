import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  constructor(private http: HttpClient) {}

  // Get contract number
  getContractNumber() {
    return this.http.get('https://api.vt.com.sa/api/contracts/number');
  }

  // Create new contract
  createContract(contractData: any) {
    return this.http.post('https://api.vt.com.sa/api/contracts', contractData);
  }
}
