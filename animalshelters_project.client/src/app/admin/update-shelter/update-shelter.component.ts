import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UrlServiceService } from '../../url-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-shelter',
  templateUrl: './update-shelter.component.html',
  styleUrl: './update-shelter.component.css'
})
export class UpdateShelterComponent {
  param: any

  shelter: any = {}; 
  ngOnInit() {
    this.param = this._active.snapshot.paramMap.get('id')

    this._ser.getShelterById(this.param).subscribe(response => {
      this.shelter = response; 
    }, error => {
      console.error("Error fetching shelter data", error);
    });
   
  }
  constructor(private _ser: UrlServiceService, private _active: ActivatedRoute, private _router: Router) {


  }

  Array: any
  UpdateShelter(data: any) {
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key])

    }


    this._ser.updateShelter(this.param, form).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Shelter Updated',
          text: 'The shelter has been updated successfully!',
          confirmButtonText: 'OK'
        }).then(() => {
          this._router.navigate(['adminDashBoard/AllShelters']);
        });
      },
      error => {
        console.error("Error updating shelter", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error updating the shelter. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}
