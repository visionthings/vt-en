import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ContractService {
  constructor(private http: HttpClient) {}
  url = environment.url;

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

  // Renew Contract
  renewContract() {
    let token, contract_number, expired_contract_number;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
      contract_number = localStorage.getItem('contract_number');
      expired_contract_number = localStorage.getItem('expired_contract_number');
    }
    let data = {
      contract_number: contract_number,
      expired_contract_number: expired_contract_number,
    };
    return this.http.post(`${this.url}/contracts/renew-contract`, data, {
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

  // Get cameras price list
  getCamerasPriceList() {
    return this.http.get(`${this.url}/camera-prices`);
  }

  // Apply Discount
  applyDiscount(data: any) {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    return this.http.post(`${this.url}/contracts/apply-discount`, data, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }

  applyPayment(data: any) {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    return this.http.post(`${this.url}/contracts/apply-payment`, data, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }
}
