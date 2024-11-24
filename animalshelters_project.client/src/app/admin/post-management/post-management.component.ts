import { Component } from '@angular/core';
import { UrlService } from '../../Fawareh/UrlService/url.service';

@Component({
  selector: 'app-post-management',
  templateUrl: './post-management.component.html',
  styleUrl: './post-management.component.css'
})
export class PostManagementComponent {

  ngOnInit(): void {
    this.loadPosts();  
  }

  constructor(private _ser: UrlService) { }

  posts: any[] = [];


  loadPosts() {
    this._ser.getAllPosts().subscribe((data) => {
      this.posts = data;
    });
  }

  togglePostStatus(postId: number) {
    this._ser.togglePostFlag(postId).subscribe((response) => {
      this.loadPosts();
    });
  }
}
