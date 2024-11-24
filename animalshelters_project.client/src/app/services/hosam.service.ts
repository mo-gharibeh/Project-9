import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { root } from '../shared/constants';
import iziToast from 'izitoast';
@Injectable({
  providedIn: 'root'
})
export class HosamService {

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('Token');
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
        .post<{ token: string, id: string }>(`${root}/api/Admins/login`, formData)
        .subscribe(
          (response) => {
            localStorage.setItem('Token', response.token);
            localStorage.setItem('AdminId', response.id)
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
    localStorage.removeItem('Token');
    localStorage.removeItem('AdminId');


    iziToast.info({
      title: 'Logout Successful',
      message: 'You are now logged out',
    });
  }

  isUserLoggedIn(): boolean {
    return this.isLoggedInSubject.getValue();
  }


}
