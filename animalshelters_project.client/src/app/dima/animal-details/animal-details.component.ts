import { Component, OnInit } from '@angular/core';
import { UrlServiceService } from '../../url-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-animal-details',
  templateUrl: './animal-details.component.html',
  styleUrls: ['./animal-details.component.css']  // Corrected from 'styleUrl' to 'styleUrls'
})
export class AnimalDetailsComponent implements OnInit {
  AnimalID: any;
  AnimalDetails: any;

  constructor(private _ser: UrlServiceService, private route: ActivatedRoute) { }

 ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const AnimalID = params.get('id');
      if (AnimalID) {
        this.AnimalID = +AnimalID; 
        this.GetAnimalDetails(this.AnimalID);  
      }
    });
  }

  
  GetAnimalDetails(AnimalID: number): void {
    this._ser.GetAnimalDetailsByID(AnimalID).subscribe(
      (response) => {
        console.log('API Response:', response);  
        this.AnimalDetails = response;           
      },
      (error) => {
        console.error('Error fetching animal details:', error);  
      }
    );
  }
}
