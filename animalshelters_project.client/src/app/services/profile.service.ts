import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = 'https://localhost:7208/api';

  constructor(private http: HttpClient) { }

  private get headers() {
    return new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`
    });
  }

  getUserProfile(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/UserProfile/${userId}`, { headers: this.headers });
  }

  updateUserProfile(userId: number, updatedData: any): Observable<void> {
    debugger
    return this.http.put<void>(`${this.baseUrl}/UserProfile/UpdateUserProfile/${userId}`, updatedData, { headers: this.headers });
  }


  getUserApps(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/UserProfile/applications/${userId}`, { headers: this.headers });
  }


  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/UserProfile`);
  }

}
