import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  constructor(private http: HttpClient) {}

  // Send payment
  sendInvoice(data: any) {
    return this.http.post(
      'https://api.wafeq.com/v1/api-invoices/bulk_send/',
      data,
      {
        headers: new HttpHeaders()
          .set('Content-Type', 'application/json')
          .set(
            'Authorization',
            `Api-Key 8PDuSkr8.QZRb0XhDvfFUICqOtrNAKheQzTcNF8MY`
          ),
      }
    );
  }
}
