import { Component } from '@angular/core';
import { UrlServiceService } from '../../url-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  ngOnInit() { }
  constructor(private _ser: UrlServiceService, private _router: Router) {
  }


  image: any

  changeImage(event: any) {

    this.image = event.target.files[0]
  }
  addCategory(data: any) {
    var form = new FormData();
    for (let key in data) {
      form.append(key, data[key]);
    }
    form.append("Image", this.image);

    this._ser.AddCategory(form).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'The category has been added successfully',
        confirmButtonText: 'OK'
      }).then(() => {
        this._router.navigate(['AdminDashBoard/AllCategories']);
      });
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'There was an error updating the category',
        confirmButtonText: 'Try Again'
      });
      console.error("Error updating category", error);
    });
  }
}
