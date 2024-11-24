import { Component } from '@angular/core';
import { UrlServiceService } from '../../url-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {


  constructor(private _ser: UrlServiceService, private _router: Router) { }

  ngOnInit() { }


  submitContactForm(data: any) {
    const form = new FormData();

    for (let key in data) {
      form.append(key, data[key])
    }
    this._ser.submitContactForm(form).subscribe(() => {
      Swal.fire({
        title: "Thank you!",
        text: "Your message has been successfully sent! We will get back to you soon!",
        showConfirmButton: false,
        timer: 2000
      })
      setTimeout(() => {
        this._router.navigate(['/']);
      }, 1000);
    },
      (error) => {
        alert(error.error)
      })
  }
}
