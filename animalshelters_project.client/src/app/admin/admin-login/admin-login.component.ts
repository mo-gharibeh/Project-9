import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HosamService } from '../../services/hosam.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  loginError: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private hosamService: HosamService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit(): Promise<void> {
    if (this.loginForm.valid) {
      this.isLoading = true;

      const { email, password } = this.loginForm.value;

      try {
        await this.hosamService.login(email, password).toPromise();

        this.isLoading = false;
        this.loginError = '';
        this.router.navigate(['/adminDashBoard']);
      } catch (error) {
        this.isLoading = false;
        this.loginError = 'Login failed. Please check your credentials.';
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}

