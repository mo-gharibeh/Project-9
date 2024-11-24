//import { Component, OnInit } from '@angular/core';
//import { UrlServiceService } from '../../url-service.service';
//import { Router } from '@angular/router';

//@Component({
//  selector: 'app-admin-dashboard',
//  templateUrl: './admin-dashboard.component.html',
//  styleUrls: ['./admin-dashboard.component.css'] 
//})
//export class AdminDashboardComponent implements OnInit {

//  contactAdminData: any[] = []; 

//  constructor(private _ser: UrlServiceService, private _router: Router) { }

//  ngOnInit() {
//    this.ContactAdmin();
//  }

//  ContactAdmin() {
//    this._ser.ContactAdmin().subscribe(
//      (data: any[]) => {
//        this.contactAdminData = data; 
//      },
//      (error) => {
//        console.error('Error fetching contacts:', error);
//      }
//    );
//  }
//}
