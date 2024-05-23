import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment.development';
export interface User {
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    commercial_number: string;
    address: string;
  };
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  url = environment.url;
  register(data: any) {
    return this.http.post<User>(`${this.url}/register`, data);
  }

  sendVerificationMail(data: any) {
    return this.http.post<User>(`${this.url}/email-verification`, data);
  }

  verifyEmail(id: any) {
    return this.http.get(`${this.url}/verify-email/${id}`);
  }

  public isAuthenticated = new BehaviorSubject(false);

  handleAuth() {
    let token = null;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }

    if (token) {
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  signIn(data: any) {
    return this.http.post<User>(`${this.url}/login`, data);
  }

  editProfile(data: any) {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    let userID = typeof window !== 'undefined' && localStorage.getItem('id');
    return this.http.put<User>(`${this.url}/users/${userID}`, data, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }
  getUser(id: any) {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    return this.http.get(`${this.url}/users/${id}`, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
    });
  }

  getCompanyData(commercial_number: any) {
    const headers = new HttpHeaders({
      accept: 'application/json',
      apiKey: '1igYNm2Pe3ElCQ4sfnIGq6FmjvC4a6Pk',
    });
    return this.http.get(
      `https://api.wathq.sa/v5/commercialregistration/fullinfo/${commercial_number}`,
      { headers: headers }
    );
  }

  addCompanyToUser(companyData: any, userID: any) {
    let data = {
      user_id: userID,
      commercial_number: companyData.commercial_number,
      company_name: companyData.company_name,
      company_type: companyData.company_type,
      building_number: companyData.building_number,
      street: companyData.street,
      district: companyData.district,
      city: companyData.city,
    };
    return this.http.post(`${this.url}/company/store`, data);
  }
  getUserCompanies(userID: any) {
    let token;
    if (typeof window !== 'undefined') {
      token = localStorage.getItem('token');
    }
    return this.http.get(`${this.url}/company/${userID}`, {
      headers: new HttpHeaders({ 'api-key': `Bearer ${token}` }),
    });
  }
  deleteCompany(companyID: any) {
    return this.http.delete(`${this.url}/company/${companyID}`);
  }

  // Website visits
  storeVisit() {
    return this.http.post(`${this.url}/visits`, {
      headers: new HttpHeaders({ Accept: 'application/json' }),
    });
  }

  // Reset Password
  resetPassword($email: string | null) {
    return this.http.post(`${this.url}/reset-password`, { email: $email });
  }

  // Create new password
  createNewPassword(data: any) {
    return this.http.post(`${this.url}/create-new-password`, data);
  }
}
