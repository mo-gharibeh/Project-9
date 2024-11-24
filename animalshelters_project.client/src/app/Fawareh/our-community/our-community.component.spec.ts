import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurCommunityComponent } from './our-community.component';

describe('OurCommunityComponent', () => {
  let component: OurCommunityComponent;
  let fixture: ComponentFixture<OurCommunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OurCommunityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
