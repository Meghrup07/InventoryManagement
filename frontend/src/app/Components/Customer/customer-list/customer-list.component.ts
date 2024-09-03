import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../../Shared/Services/customer.service';
import { Customers } from '../../../Shared/Models/customer';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css'
})
export class CustomerListComponent implements OnInit {

  private route = inject(Router);
  private customerService = inject(CustomerService);
  private toastr = inject(ToastrService);

  customers: Customers | null = null;
  search = '';
  pageNumber = 1;
  pageSize = 10;

  ngOnInit(): void {
    this.getCustomersList();
  }

  getCustomersList() {
    this.customerService.getCustomers(this.pageNumber, this.pageSize, this.search).subscribe((res) => {
      this.customers = res;
    });
  }

  onSearchChange(search: string): void {
    this.search = search;
    this.pageNumber = 1;
    this.getCustomersList();
  }

  onPageChange(page: number): void {
    this.pageNumber = page;
    this.getCustomersList();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageNumber = 1;
    this.getCustomersList();
  }

  getTotalPages(): number {
    return Math.ceil((this.customers?.totalCount ?? 0) / this.pageSize);
  }

  getPagesArray(): number[] {
    const totalPages = this.getTotalPages();
    return Array(totalPages).fill(0).map((x, i) => i + 1);
  }

  addCustomer() {
    this.route.navigateByUrl("/customer/add");
  }

  editCustomer(id: number) {
    this.route.navigateByUrl(`/customer/edit/${id}`);
  }

  deleteCustomer(id: number) {
    this.customerService.deleteCustomer(id).subscribe({
      next: _ => {
        this.toastr.success("customer deleted");
        this.getCustomersList();
      },
      error: _ => {
        this.toastr.success("something went wrong");
      }
    })
  }

}
