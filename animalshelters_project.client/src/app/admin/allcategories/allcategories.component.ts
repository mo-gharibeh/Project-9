import { Component } from '@angular/core';
import { UrlServiceService } from '../../url-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-allcategories',
  templateUrl: './allcategories.component.html',
  styleUrl: './allcategories.component.css'
})
export class AllcategoriesComponent {
  ngOnInit() {

    this.GetCategoryAdmin();
  }
  constructor(private _ser: UrlServiceService) {


  }

  Array: any
  GetCategoryAdmin() {
    this._ser.getCategory().subscribe((data) => {
      this.Array = data
      console.log(this.Array, "this.categoryArray")
    })

  }

  deleteCategory(id: number): void {
    // Use SweetAlert2 for confirmation
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this category?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._ser.deleteCategory(id).subscribe(
          () => { // No need to check the response; successful API call means it was deleted
            console.log('Category deleted');

            // Filter out the deleted category from the array
            this.Array = this.Array.filter((item: any) => item.id !== id);

            // Show success message
            Swal.fire(
              'Deleted!',
              'The category has been deleted.',
              'success'
            );
          },
          error => {
            console.error('Error deleting category:', error);

            // Show error message
            Swal.fire(
              'Error!',
              'There was a problem deleting the category.',
              'error'
            );
          }
        );
      }
    });
  }
}
