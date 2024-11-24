import { Component } from '@angular/core';
import { UrlServiceService } from '../../url-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-animal',
  templateUrl: './update-animal.component.html',
  styleUrl: './update-animal.component.css'
})
export class UpdateAnimalComponent {
  param: any
  imageFile: File | null = null;
  animal: any = {};
  categories: any[] = [];
  shelters: any[] = [];

  ngOnInit() {
    this.param = this._active.snapshot.paramMap.get('id')

    this._ser.getAnimalById(this.param).subscribe(response => {
      debugger
      this.animal = response;
    }


      , error => {
      console.error("Error fetching animal data", error);
    });
   
    this._ser.getShelters().subscribe(sheltersResponse => {
      this.shelters = sheltersResponse; 
    }, error => {
      console.error("Error fetching shelters", error);
    });

    this._ser.getCategory().subscribe(categoriesResponse => {
      this.categories = categoriesResponse; // Store categories for dropdown
    }, error => {
      console.error("Error fetching categories", error);
    });
  }
  constructor(private _ser: UrlServiceService, private _active: ActivatedRoute, private _router: Router) {


  }
  changeImage(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
      console.log('Selected image:', this.imageFile);
    }
  }
  Array: any
  Updateanimal(data: any) {
    const form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }

    if (this.imageFile) {
      form.append('ImageUrl', this.imageFile);
    }

    this._ser.UpdateAnimal(this.param, form).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'The animal has been updated successfully!',
          confirmButtonText: 'OK'
        }).then(() => {
          this._router.navigate(['adminDashBoard/AllAnimal']);
        });
      },
      error => {
        console.error("Error updating Animals", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error updating the animal. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}
