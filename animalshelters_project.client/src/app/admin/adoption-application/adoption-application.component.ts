import { Component } from '@angular/core';
import { UrlServiceService } from '../../url-service.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adoption-application',
  templateUrl: './adoption-application.component.html',
  styleUrls: ['./adoption-application.component.css']
})
export class AdoptionApplicationComponent {
  application: any;
  selectedApplication: any;
  showModal = false;  

  constructor(private _ser: UrlServiceService, private router: Router) { }

  ngOnInit() {
    this.Getapplication();
  }

  Getapplication() {
    this._ser.GetAllAdoptionapplication().subscribe((data) => {
      this.application = data;
    });
  }

  openModal(app: any) {
    this.selectedApplication = app;
    this.showModal = true;
  }

  
  closeModal() {
    this.showModal = false;
  }

  acceptApplication(id: number) {
    this._ser.AcceptApplication(id).subscribe(
      (response) => {
       
        Swal.fire({
          icon: 'success',
          title: 'Application Accepted',
          text: "Application accepted and others rejected.", 
          confirmButtonText: 'OK'
        }).then(() => {
          
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate(['/adminDashBoard/AdoptionApplication']);
          });
        });
      },
      (error) => {
        let errorMessage = 'An unknown error occurred';
        if (error.error?.message) {
          errorMessage = error.error.message; 
        } else if (error.message) {
          errorMessage = error.message;
        }

        
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
          confirmButtonText: 'OK'
        });
      }
    );
  }




}
