import { Component } from '@angular/core';
import { UrlService } from '../UrlService/url.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-our-community',
  templateUrl: './our-community.component.html',
  styleUrl: './our-community.component.css'
})
export class OurCommunityComponent {

  showCommentBox: boolean = false;
  userId: any;
  newComment: string = "";
  newReply: string = "";
  // Stores the visibility of comment boxes for each post
  commentBoxes: any = {};

  // Store comments and replies for posts
  replies: any = {};
  comments: any[] = [];

  posts: any[] = [];

  constructor(private _ser: UrlService, private router: Router) { }

  ngOnInit() {
    //this.userId = localStorage.getItem('userId')
    this.getAllPosts();
  }

  getAllPosts() {
    this._ser.allPosts().subscribe((data) => {
      this.posts = data;

  
    });
  }

  data = {
    "postId": 0,
    "userId": localStorage.getItem('userId'),
  }

  status: any = false;
  addLike(postId: number) {
    this.data.postId = postId;
    debugger
    if (localStorage.getItem('userId') == null) {
      alert("You should login first");
      this.router.navigate(['/login']);
    }

    //this.checkIfLikedOrNot(Number(this.data.userId), this.data.postId)
    
    this._ser.addLike(this.data).subscribe((status) => {
      this.status = status;
      console.log(status);
      this.getAllPosts();
    });
  }

  // Toggle the comment section visibility and load comments
  toggleCommentBox(postId: number) {
    if (!this.commentBoxes[postId]) {
      this.getCommentsForPost(postId);  // Fetch comments only if the box isn't open
    }
    this.commentBoxes[postId] = !this.commentBoxes[postId];
  }

  toggleReplayBox(commentId: any) {
    this.getRepliesForComment(commentId);
  }

  getCommentsForPost(postId: number) {
    this._ser.getComments(postId).subscribe((data) => {
      this.comments[postId] = data;
    });
  }

  // Add a new comment to a post
  submitComment(postId: number) {
    if (!this.newComment.trim()) return; // Prevent empty comments

    if (localStorage.getItem('userId') == null) {
      alert("You should login first");
      this.router.navigate(['/login']);
    }
    const commentData = {
      postId: postId,
      userId: localStorage.getItem('userId'),  // Assume userId is available
      content: this.newComment
    };

    this._ser.addComment(commentData).subscribe(() => {
      this.getCommentsForPost(postId);
      this.newComment = "";  // Clear the input after submitting
    });
  }

  getRepliesForComment(commentId: number) {
    this._ser.getReplies(commentId).subscribe((data) => {
      this.replies[commentId] = data;
    });
  }

  submitReply(commentId: number) {
    if (localStorage.getItem('userId') == null) {
      alert("You should login first");
      this.router.navigate(['/login']);
    }

    const replyData = {
      commentId: commentId,
      userId: localStorage.getItem('userId'),
      content: this.newReply
    };

    this._ser.addReply(replyData).subscribe(() => {
      this.getRepliesForComment(commentId);
      this.newReply = "";  // Clear input after submitting
    });
  }


  navigateToAddPage() { 
    this.router.navigate(['/postForm']);
  }


  shareOnFacebook(postId: number) {
    const postUrl = `https://127.0.0.1:4200/ourCommunity${postId}`;  // Example of the post's URL
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
    window.open(facebookShareUrl, '_blank');
  }
}

