import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor() { }

  getTeam() {
    return [

      {
        name: 'Tuqa Harahsheh',
        role: 'Scrum Master',
        imageUrl: 'assets/images/team/team-02.jpg',
        social: [
          { platform: 'LinkedIn', link: '#' },
          { platform: 'GitHub', link: '#' },
          
        ]
      },
      {
        name: 'Mohammad Garaibeh',
        role: 'Product Owner',
        imageUrl: 'assets/images/team/team-02.jpg',
        social: [
          { platform: 'LinkedIn', link: '#' },
          { platform: 'GitHub', link: '#' },

        ]
      },
      {
        name: 'Dema Ahmad',
        role: 'Web Developer',
        imageUrl: 'assets/images/team/team-02.jpg',
        social: [
          { platform: 'LinkedIn', link: '#' },
          { platform: 'GitHub', link: '#' },

        ]

      },
      {
        name: 'Hosam AbuHija',
        role: 'Web Developer',
        imageUrl: 'assets/images/team/team-02.jpg',
        social: [
          { platform: 'LinkedIn', link: '#' },
          { platform: 'GitHub', link: '#' },

        ]
      },
      {
        name: 'Anas AlNajjar',
        role: 'Web Developer',
        imageUrl: 'assets/images/team/team-02.jpg',
        social: [
          { platform: 'LinkedIn', link: '#' },
          { platform: 'GitHub', link: '#' },

        ]
      },

      {
        name: 'Mohammad Fwareh',
        role: 'Web Developer',
        imageUrl: 'assets/images/team/team-02.jpg',
        social: [
          { platform: 'LinkedIn', link: '#' },
          { platform: 'GitHub', link: '#' },

        ]
      }
    ];
  }
}
