import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
  services: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.services = [
      {
        title: 'Pet Grooming',
        description: 'Our pet grooming service ensures your pets stay clean, happy, and well-groomed. We handle everything from baths to hair trimming.',
        icon: 'fa-paw'
      },
      {
        title: 'Pet Sitting',
        description: 'Need someone to take care of your pets while you are away? Our pet sitting service provides reliable and loving care for your furry friends.',
        icon: 'fa-home'
      },
      {
        title: 'Veterinary Services',
        description: 'We offer essential veterinary services to keep your pets healthy, including check-ups, vaccinations, and emergency care.',
        icon: 'fa-stethoscope'
      },
      {
        title: 'Dog Walking',
        description: 'Our professional dog walkers ensure your pet gets the exercise they need with daily walks in a safe environment.',
        icon: 'fa-walking'
      },
      {
        title: 'Pet Training',
        description: 'We provide professional pet training services to help your pets learn essential obedience and behavioral skills.',
        icon: 'fa-chalkboard-teacher'
      }
    ];
  }
}
