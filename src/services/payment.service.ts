import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface paymentData {
  amount: number;
  currency: string;
  description: string;
  callback_url: string;
  on_completed: string;
  source: {
    type: string;
    name: string | null | undefined;
    number: string | null | undefined;
    cvc: string | null | undefined;
    month: string | undefined;
    year: string | undefined;
  };
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  username = 'pk_live_3oEm9EZqLmQ2b7LuCwrHa4eWTV7ySnGBKPY8hLkJ';
  password = '';
  auth = btoa(`${this.username}:${this.password}`);

  // Send payment
  sendPayment(data: paymentData) {
    return this.http.post<paymentData>(
      'https://api.moyasar.com/v1/payments',
      data,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set('Authorization', `Basic ${this.auth}`),
      }
    );
  }
}
