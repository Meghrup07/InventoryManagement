import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../Shared/Services/customer.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Customers } from '../../../Shared/Models/customer';

@Component({
  selector: 'app-customer-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-edit.component.html',
  styleUrl: './customer-edit.component.css'
})
export class CustomerEditComponent implements OnInit {
  private route = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private customerServices = inject(CustomerService);
  private toastr = inject(ToastrService);
  customerId: any;
  customerDetails: any;
  updateForm!: FormGroup;

  cityOptions: { [key: string]: string[] } = {
    Gujarat: ['Ahmedabad', 'Surat', 'Vadodara'],
    Maharashtra: ['Mumbai', 'Pune', 'Nashik'],
  };
  cities: string[] = [];

  ngOnInit(): void {
    this.updateCustomerForm();
    this.customerId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getCustomerDetails();
  }

  getCustomerDetails() {
    this.customerServices.getCustomer(this.customerId).subscribe((res) => {
      this.customerDetails = res;
      this.updateCustomerForm();
      this.onStateChange();
      this.updateCityOptions();
    })
  }

  updateCustomerForm() {
    this.updateForm = new FormGroup({
      name: new FormControl(this.customerDetails ? this.customerDetails['name'] : null, [Validators.required]),
      email: new FormControl(this.customerDetails ? this.customerDetails['email'] : null, [Validators.required]),
      phone: new FormControl(this.customerDetails ? this.customerDetails['phone'] : null),
      address: new FormControl(this.customerDetails ? this.customerDetails['address'] : null),
      state: new FormControl(this.customerDetails ? this.customerDetails['state'] : null, [Validators.required]),
      city: new FormControl(this.customerDetails ? this.customerDetails['city'] : null, [Validators.required]),
    })
  }

  onStateChange() {
    this.updateForm.get('state')?.valueChanges.subscribe(selectedState => {
      this.cities = this.cityOptions[selectedState] || [];
      this.updateForm.get('city')?.setValue(null);
    });
  }

  updateCityOptions() {
    const currentState = this.updateForm.get('state')?.value;
    this.cities = this.cityOptions[currentState] || [];
  }

  updateCustomer() {
    const formValue = {
      name: this.updateForm.controls['name'].value,
      email: this.updateForm.controls['email'].value,
      phone: this.updateForm.controls['phone'].value,
      address: this.updateForm.controls['address'].value,
      state: this.updateForm.controls['state'].value,
      city: this.updateForm.controls['city'].value,
    }
    this.customerServices.updateCustomer(formValue, this.customerId).subscribe({
      next: _ => {
        this.toastr.success("customer updated");
        this.route.navigateByUrl("/customer");
      },
      error: _ => {
        this.toastr.error("something went wrong");
      }
    })
  }

  backToList() {
    this.route.navigateByUrl("/customer");
  }

}
