import { Component, OnInit } from '@angular/core';
import { UrlServiceService } from '../../url-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css'] 
})
export class AnimalComponent implements OnInit {
  animals: any[] = [];
  categoryId!: number;
  filteredAnimals: any[] = [];
  breedFilter: string = '';
  minAgeFilter: number | null = null; 
  maxAgeFilter: number | null = null;


  constructor(private _ser: UrlServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const categoryId = params.get('id'); 
      if (categoryId) {
        this.categoryId = +categoryId; 
        this.getAnimalsByCategory(this.categoryId); 
      }
    });
  }

  getAnimalsByCategory(categoryId: number): void {
    this._ser.GetAnimalsByCategory(categoryId).subscribe(
      (response) => {
        console.log('API Response:', response);  
        this.animals = response;
        this.filteredAnimals = this.animals;
      },
      (error) => {
        console.error('Error fetching animals:', error);
      }
    );
  }
  applyFilters(): void {
    this.filteredAnimals = this.animals.filter(animal => {
      const matchesBreed = this.breedFilter ? animal.breed.toLowerCase().includes(this.breedFilter.toLowerCase()) : true;
      const matchesAge = this.matchAge(animal.age);
            return matchesBreed && matchesAge;
    });
  }
  
  matchAge(animalAge: number): boolean {
    let matchesMinAge = true;
    let matchesMaxAge = true;

    if (this.minAgeFilter !== null) {
      matchesMinAge = animalAge >= this.minAgeFilter;
    }

    if (this.maxAgeFilter !== null) {
      matchesMaxAge = animalAge <= this.maxAgeFilter;
    }

    return matchesMinAge && matchesMaxAge;
  }


}
