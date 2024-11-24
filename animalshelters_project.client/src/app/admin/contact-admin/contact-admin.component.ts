//import { Component } from '@angular/core';
//import { UrlServiceService } from '../../url-service.service';
//import { Router } from '@angular/router';

//@Component({
//  selector: 'app-contact-admin',
//  templateUrl: './contact-admin.component.html',
//  styleUrl: './contact-admin.component.css'
//})
//export class ContactAdminComponent {
//  contacts: any[] = [];

//  constructor(private _ser: UrlServiceService, private _router: Router) { }

//  ngOnInit() {
//    this.getContacts();
//  }

//  getContacts() {
//    this._ser.ContactAdmin().subscribe(
//      (data: any[]) => {
//        this.contacts = data; 
//      },
//      (error) => {
//        console.error('Error fetching contacts:', error);
//      }
//    );
//  }

//  //updateStatus(id: number) {
//  //  this._ser.updateContactStatus(id).subscribe(

//  //    () => {
//  //      debugger

//  //      alert('Contact status updated successfully!');
//  //      this.getContacts();
//  //    },
//  //    (error) => {
//  //      debugger

//  //      alert('Error updating contact status');
//  //      console.error('Error updating contact status:', error);
//  //    }
//  //  )
//}

