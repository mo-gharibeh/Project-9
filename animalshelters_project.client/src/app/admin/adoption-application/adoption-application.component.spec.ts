import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoptionApplicationComponent } from './adoption-application.component';

describe('AdoptionApplicationComponent', () => {
  let component: AdoptionApplicationComponent;
  let fixture: ComponentFixture<AdoptionApplicationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdoptionApplicationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdoptionApplicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
