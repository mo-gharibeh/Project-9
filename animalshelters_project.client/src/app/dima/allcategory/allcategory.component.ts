import { Component } from '@angular/core';
import { UrlServiceService } from '../../url-service.service';

@Component({
  selector: 'app-allcategory',
  templateUrl: './allcategory.component.html',
  styleUrl: './allcategory.component.css'
})
export class AllcategoryComponent {
  Array: any;

  constructor(private _ser: UrlServiceService) { }

  ngOnInit() {
    this.GetCategories();
  }


  GetCategories() {
    this._ser.getCategory().subscribe(
      (data) => {
        this.Array = data;
        console.log(this.Array, "Category Array");
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

}
