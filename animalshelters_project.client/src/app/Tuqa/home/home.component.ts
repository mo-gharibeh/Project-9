import { Component, OnInit } from '@angular/core';
import { TeamService } from '../../Tuqa/Tuqa/team.service'; // Adjust the path if needed

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  team: any[] = [];  // Define the 'team' property

  constructor(private teamService: TeamService) { }

  ngOnInit(): void {
    this.team = this.teamService.getTeam();  // Fetch the team data using the service
  }
}
