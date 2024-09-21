import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../../Shared/Services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { state } from '@angular/animations';

@Component({
  selector: 'app-customer-add',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-add.component.html',
  styleUrl: './customer-add.component.css'
})
export class CustomerAddComponent implements OnInit {
  private route = inject(Router);
  private customerService = inject(CustomerService);
  private toastr = inject(ToastrService);
  customerForm!: FormGroup;

  cityOptions: { [key: string]: string[] } = {
    Gujarat: ['Ahmedabad', 'Surat', 'Vadodara'],
    Maharashtra: ['Mumbai', 'Pune', 'Nashik'],
  };
  cities: string[] = [];

  ngOnInit(): void {
    this.getCustomerForm();
    this.onStateChange();
  }

  getCustomerForm() {
    this.customerForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      phone: new FormControl(null),
      address: new FormControl(null),
      state: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
    })
  }

  onStateChange() {
    this.customerForm.get('state')?.valueChanges.subscribe(selectedState => {
      this.cities = this.cityOptions[selectedState] || [];
      this.customerForm.get('city')?.setValue(null);
    });
  }

  addCustomer() {
    this.customerService.addCustomer(this.customerForm.value).subscribe({
      next: _ => {
        this.toastr.success('customer added');
        this.route.navigateByUrl("/customer");
      },
      error: _ => {
        this.toastr.error('something went wrong');
      }
    })
  }

  backToList() {
    this.route.navigateByUrl("/customer");
  }

}
