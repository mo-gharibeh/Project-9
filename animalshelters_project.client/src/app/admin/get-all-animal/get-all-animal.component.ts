import { Component } from '@angular/core';
import { UrlServiceService } from '../../url-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-get-all-animal',
  templateUrl: './get-all-animal.component.html',
  styleUrl: './get-all-animal.component.css'
})
export class GetAllAnimalComponent {

 
  ngOnInit() {

    this.GetAnimalAdmin();
  }
  constructor(private _ser: UrlServiceService) {


  }

  Array: any
  GetAnimalAdmin() {
    this._ser.GetAllAnimal().subscribe((data) => {
      this.Array = data
      console.log(this.Array, "this.AnimalArray")
    })

  }



  //editAnimal(animalId: number) {
  //  console.log('Edit animal with ID:', animalId);
    
  //}

  deleteAnimal(animalId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to undo this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._ser.DeleteAnimalByID(animalId).subscribe(
          (response) => {
            console.log('Delete animal with ID:', animalId);

            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'The animal has been deleted successfully.'
            });
          },
          (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Failed',
              text: 'There was an error deleting the animal. Please try again later.'
            });
            console.error('Error deleting animal:', error);
          }
        );
      }
    });
  }


}
