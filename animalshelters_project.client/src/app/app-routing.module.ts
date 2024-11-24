import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalComponent } from './dima/animal/animal.component';
import { AnimalDetailsComponent } from './dima/animal-details/animal-details.component';
import { AdoptionFormComponent } from './dima/adoption-form/adoption-form.component';

const routes: Routes = [
  { path: 'animal/:id', component: AnimalComponent },
  { path: 'animalDetails/:id', component: AnimalDetailsComponent },
  {path:'adoptionForm/:id',component:AdoptionFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
