import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../Tuqa/team.service'; // Adjust the path as necessary

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})

export class TeamComponent implements OnInit {
  team: any[] = [];

  // The constructor is used for dependency injection.
  constructor(private teamService: TeamService) { }

  // This lifecycle hook runs when the component is initialized.
  ngOnInit(): void {
    // Fetch the team data from the TeamService.
    this.team = this.teamService.getTeam();
  }

  // Function to get the color for each social platform
  getSocialColor(platform: string): string {
    const colors: { [key: string]: string } = {  // Add index signature here
      facebook: '#3b5998',
      instagram: '#e4405f',
      twitter: '#1da1f2',
      linkedin: '#0077b5',
      // Add more platforms if necessary
    };
    return colors[platform] || '#333';  // Default to dark color if no match
  }
}
