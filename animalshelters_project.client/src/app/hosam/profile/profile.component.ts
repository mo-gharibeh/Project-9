import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userId!: number;
  userProfile: any;
  userApps: any[] = [];
  imageFile: File | null = null;

  constructor(private apiService: ProfileService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.userId = +storedUserId;
      this.loadUserProfile();
      this.loadUserApps();
    } else {
      console.error('User ID not found in localStorage!');
      this.router.navigate(['/login']);
    }
  }

  loadUserProfile(): void {
    this.apiService.getUserProfile(this.userId).subscribe(
      (data) => {
        this.userProfile = data;
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }

  loadUserApps(): void {
    this.apiService.getUserApps(this.userId).subscribe(
      (data: any) => {
        this.userApps = Array.isArray(data) ? data : [];
        console.log('Apps', this.userApps);
      },
      (error) => {
        console.error('Error fetching user Applications:', error);
      }
    );
  }

  isActive(endDate: string): boolean {
    const today = new Date();
    return new Date(endDate) >= today;
  }


  onImageSelected(event: any): void {
    debugger
    const file: File = event.target.files[0];
    if (file) {
      this.imageFile = file;
      console.log('Selected image file:', this.imageFile);
    } else {
      console.log('No file selected.');
    }
  }


  updateProfile(data: any): void {
    debugger
    const formData = new FormData();

    for (const key in data) {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    }

    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    this.apiService.updateUserProfile(this.userId, formData).subscribe(
      () => {
        alert('User profile updated successfully');
        this.router.navigate(['/profile']);
      },
      (error: HttpErrorResponse) => {
        console.error('Error updating user profile:', error);

        // Check if it's a validation error (status 400)
        if (error.status === 400) {
          const validationErrors = error.error.errors;

          if (validationErrors) {
            // Iterate through the validation errors and show them
            let errorMessage = 'Validation errors occurred: \n';
            for (const field in validationErrors) {
              if (validationErrors.hasOwnProperty(field)) {
                errorMessage += `${field}: ${validationErrors[field].join(', ')}\n`;
              }
            }
            alert(errorMessage);
          } else {
            alert('An error occurred while updating the profile. Please try again.');
          }
        } else {
          alert(error.message);  // Fallback for other error types
        }
      }
    );

  }

}



