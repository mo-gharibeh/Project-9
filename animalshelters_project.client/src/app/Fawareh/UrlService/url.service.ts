import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlService {

  

  constructor(private http: HttpClient) { }

  staticUrl = "https://localhost:7208/api";


  addPost(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticUrl}/Gharibeh_s/addPost`, data)
  }

  allPosts(): Observable<any> {
    return this.http.get<any>(`${this.staticUrl}/Gharibeh_s/allPost`)
  }

  addLike(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticUrl}/Gharibeh_s/addLike`, data)
  }

  // Add a comment to a post
  getComments(postId: number) {
    return this.http.get(`${this.staticUrl}/Gharibeh_s/displayComments/${postId}`);
  }

  addComment(commentData: any) {
    return this.http.post(`${this.staticUrl}/Gharibeh_s/addComment`, commentData);
  }

  getReplies(commentId: number): Observable<any> {
    return this.http.get(`${this.staticUrl}/Gharibeh_s/displayReplaies/${commentId}`);
  }

  addReply(replyData: any): Observable<any> {
    return this.http.post(`${this.staticUrl}/Gharibeh_s/addReplay`, replyData);
  }

  getAllPosts(): Observable<any> {
    return this.http.get<any>(`${this.staticUrl}/Gharibeh_s/getAllPosts`)
  }

  // Toggle the post flag (Accept/Reject)
  togglePostFlag(postId: number) {
    return this.http.put(`${this.staticUrl}/Fawareh/AcceptPost/${postId}`, {});
  }
}
