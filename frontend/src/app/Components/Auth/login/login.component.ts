import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../Shared/Services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  private route = inject(Router);
  private toastr = inject(ToastrService);
  private authService = inject(AuthService);
  loginForm!: FormGroup;

  ngOnInit(): void {
    this.getLoginForm();
  }

  getLoginForm() {
    this.loginForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    })
  }

  userLogin() {
    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.toastr.success("login successfull");
        this.route.navigateByUrl("category");
      },
      error: () => {
        this.toastr.error("Something went wrong");
      }
    })
  }

  register() {
    this.route.navigateByUrl("auth/register");
  }

}
