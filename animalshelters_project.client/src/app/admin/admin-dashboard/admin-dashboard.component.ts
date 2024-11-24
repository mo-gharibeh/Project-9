import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HosamService } from '../../services/hosam.service';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  constructor(private hosamService: HosamService, private router: Router) { }
  ngOnInit(): void { }
  isAdmin = true;
  Logout() {
    this.hosamService.logout();
    this.router.navigate([`/admin`]);
  }
 
}
