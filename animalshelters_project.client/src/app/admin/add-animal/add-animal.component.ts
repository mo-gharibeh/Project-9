import { Component } from '@angular/core';
import { UrlServiceService } from '../../url-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-animal',
  templateUrl: './add-animal.component.html',
  styleUrl: './add-animal.component.css'
})
export class AddAnimalComponent {

  shelters: any[] = [];
  categories: any[] = [];
  image: any

  ngOnInit() {
    this._ser.getShelters().subscribe(
      (sheltersResponse) => {
        this.shelters = sheltersResponse; 
      },
      (error) => {
        console.error('Error fetching shelters', error);
      }
    );
    this._ser.getCategory().subscribe(
      (categoriesResponse) => {
        this.categories = categoriesResponse; 
      },
      (error) => {
        console.error('Error fetching categories', error);
      }
    );
}
  constructor(private _ser: UrlServiceService, private _router: Router) {
  }
 
  changeImage(event: any) {

    this.image = event.target.files[0]
  }
  addAnimal(data: any) {
    const form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }
    form.append("ImageUrl", this.image);

    this._ser.AddAnimal(form).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'The animal has been added successfully!',
          confirmButtonText: 'OK'
        }).then(() => {
          this._router.navigate(['AdminDashBoard/AllAnimal']);
        });
      },
      (error) => {
        console.error('Error updating Animal', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'There was an error adding the animal. Please try again.',
          confirmButtonText: 'OK'
        });
      }
    );
  }
}
