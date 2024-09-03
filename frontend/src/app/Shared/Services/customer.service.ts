import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CustomerRequest, Customers } from '../Models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private http = inject(HttpClient)
  apiUrl = "http://localhost:5140/api/"

  getCustomers(pageNumber: number, pageSize: number, search: string) {
    const url = this.apiUrl + 'Customer';
    const params = new HttpParams()
      .set('PageNumber', pageNumber)
      .set('PageSize', pageSize)
      .set('Search', search);
    return this.http.get<Customers>(url, { params });
  }

  getCustomer(id: number) {
    const url = this.apiUrl + `Customer/${id}`;
    return this.http.get<Customers>(url);
  }

  addCustomer(data: CustomerRequest) {
    const url = this.apiUrl + 'Customer';
    return this.http.post(url, data);
  }

  updateCustomer(data: CustomerRequest, id: number) {
    const url = this.apiUrl + `Customer/${id}`;
    return this.http.put(url, data);
  }

  deleteCustomer(id: number) {
    const url = this.apiUrl + `Customer/${id}`;
    return this.http.delete<Customers>(url);
  }

}
