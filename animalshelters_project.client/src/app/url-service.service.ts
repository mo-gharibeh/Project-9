import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlServiceService {

  constructor(private http: HttpClient) { }
  staticData = "https://localhost:7208/api";

  
  getCategory(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Admin/GetAllCategory`);
  
  }
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.staticData}/Admin/DeletCategoryById/${id}`);
  }

  GetAnimalsByCategory(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.staticData}/Admin/AnimalsbyCategoryId/${id}`);
  }
  GetAnimalDetailsByID(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Admin/GetAnimalDetailsById/${id}`)
  }

  submitContactForm(contactData: FormData): Observable<any> {

    return this.http.post(`${this.staticData}/Contact/newmassege`, contactData );
  }


  GetUserByID(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Admin/getUserByID/${id}`)
  }
  

  SubmitAdoptionApplication(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Admin/ApplicationFormSubmit`, data);
  }
  
  getCategoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Admin/GetCategoryByID/${id}`)
  }
  updateCategory(id: any, data: any): Observable<any> {
    return this.http.put(`${this.staticData}/Admin/UpdateCategory/${id}`, data)
  }

  
  AddCategory(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Admin/AddNewCategory`, data);

  }

 

  AddShelter(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Admin/addShelters`, data);

  }
  getShelters(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Admin/getAllAShelters`);

  }


  deleteShelter(id: number): Observable<any> {
    return this.http.delete(`${this.staticData}/Admin/deleteShelter/${id}`);
  }

 
  updateShelter(id: any, data: any): Observable<any> {
    return this.http.put(`${this.staticData}/Admin/updateShelter/${id}`, data)
  }

  getShelterById(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Admin/GetShelterByID/${id}`)
  }
 
  GetAllAnimal(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Admin/getAllAnimals`);

  }
  DeleteAnimalByID(id: any): Observable<any> {
    return this.http.delete<any>(`${this.staticData}/Admin/deleteAnimal/${id}`)
  }
  UpdateAnimal(id: any, data: any): Observable<any> {
    return this.http.put(`${this.staticData}/Admin/updateAnimals/${id}`, data)
  }

  getAnimalById(id: number): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Admin/getAnimalsbyID/${id}`)
  }

  AddAnimal(data: any): Observable<any> {
    return this.http.post<any>(`${this.staticData}/Admin/addAnimals`, data);

  }
  GetAllAdoptionapplication(): Observable<any> {
    return this.http.get<any>(`${this.staticData}/Admin/GetAllAdoptionApplication`)
  }
  AcceptApplication(id: number): Observable<any> {
    return this.http.put<any>(`${this.staticData}/Admin/${id}/accept`, null);
  }

}
