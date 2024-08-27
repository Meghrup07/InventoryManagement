import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../Shared/Services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  private route = inject(Router);
  private authService = inject(AuthService);
  registerForm!: FormGroup;

  ngOnInit(): void {
    this.getRegisterForm();
  }

  getRegisterForm() {
    this.registerForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required]),
      phone: new FormControl(null),
      password: new FormControl(null, [Validators.required])
    })
  }

  register() {
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.route.navigateByUrl('category')
      },
      error: () => alert("Something went wrong")
    })
  }

  backToLogin() {
    this.route.navigateByUrl("");
  }

}
