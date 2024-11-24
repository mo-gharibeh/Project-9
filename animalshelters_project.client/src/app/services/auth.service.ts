import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { root } from '../shared/constants';
import iziToast from 'izitoast';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoggedInSubject.next(true);
    }
  }

  login(email: string, password: string): Observable<void> {
    const formData = new FormData();
    formData.append('Email', email);
    formData.append('Password', password);

    return new Observable<void>((observer) => {
      this.http
        .post<{ token: string, id: string }>(`${root}/api/Auth/login`, formData)
        .subscribe(
          (response) => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('userId', response.id)
            iziToast.success({
              title: 'Login Successful',
              message: 'You are now logged in',
            });

            this.isLoggedInSubject.next(true);

            observer.next();
            observer.complete();
          },
          (error) => {
            iziToast.error({
              title: 'Login Failed',
              message: 'Invalid email or password',
            });
            console.error('Login error:', error);

            observer.error(error);
          }
        );
    });
  }

  logout(): void {
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    iziToast.info({
      title: 'Logout Successful',
      message: 'You are now logged out',
    });
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedInSubject.getValue();
  }

  register(email: string, password: string, username: string): Observable<any> {
    const formData = new FormData();
    formData.append('Email', email);
    formData.append('Password', password);
    formData.append('Username', username);

    return this.http.post<any>(`${root}/api/Auth/register`, formData);
  }

  resetPassword(email: string): Observable<any> {
    const formData = new FormData();
    formData.append('Email', email);
    localStorage.setItem('userEmail', email)
    return this.http.post<any>(`${root}/api/PasswordReset/request-reset`, formData);
  }

  passwordReset(password: string): Observable<any> {
    debugger;
    var email = localStorage.getItem('userEmail');
    var opject = {
      "email": email,
      "password": password
    }
    return this.http.put<any>(`${root}/api/Auth`, opject);
  }

  virifyOtp(otp: string): Observable<any> {
    var email = localStorage.getItem('userEmail');
    var opject =  {
      "email" : email,
      "otp" : otp
    };

    return this.http.post<any>(`${root}/api/PasswordReset/verify-otp`, opject);
  }



  fetchData(apiUrl: string): Observable<any> {
    return this.http.get<any>(apiUrl);
  }

  headers() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });
  }
}
