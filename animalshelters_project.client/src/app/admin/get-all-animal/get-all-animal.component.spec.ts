import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllAnimalComponent } from './get-all-animal.component';

describe('GetAllAnimalComponent', () => {
  let component: GetAllAnimalComponent;
  let fixture: ComponentFixture<GetAllAnimalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GetAllAnimalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllAnimalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
