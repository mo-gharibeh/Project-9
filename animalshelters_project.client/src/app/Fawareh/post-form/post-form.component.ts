import { Component } from '@angular/core';
import { UrlService } from '../UrlService/url.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrl: './post-form.component.css'
})
export class PostFormComponent {




  ngOnInit() {

  }

  constructor(private _ser: UrlService) {

  }



  image: any

  changeImage(event: any) {

  this.image = event.target.files[0]
}

  addPost(data: any) {
    var form = new FormData();
    form.append('userId', '1');  // Static user_id set to 1

    for (let key in data) {
      form.append(key, data[key])

    }

    form.append("image", this.image)

    this._ser.addPost(form).subscribe(() => {
      alert("Post has been submitted")
    })
  }


}
