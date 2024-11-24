import { Component } from '@angular/core';
import { UrlServiceService } from '../../url-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-shelters',
  templateUrl: './all-shelters.component.html',
  styleUrl: './all-shelters.component.css'
})
export class AllSheltersComponent {
  ngOnInit() {

    this.GetShelterAdmin();
  }
  constructor(private _ser: UrlServiceService) {


  }

  Array: any
  GetShelterAdmin() {
    this._ser.getShelters().subscribe((data) => {
      this.Array = data
      console.log(this.Array, "this.shelterArray")
    })

  }


  deleteShelter(id: number): void {

    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this Shelter? If you Deleted all animal inside it will be deleted also',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._ser.deleteShelter(id).subscribe(
          () => {
            console.log('Shelter deleted');

            this.Array = this.Array.filter((item: any) => item.id !== id);
            Swal.fire(
              'Deleted!',
              'The shelter has been deleted.',
              'success'
            );
          },
          error => {
            console.error('Error deleting Shelter:', error);

            Swal.fire(
              'Error!',
              'There was a problem deleting the Shelter.',
              'error'
            );
          }
        );
      }
    });
  }
}
