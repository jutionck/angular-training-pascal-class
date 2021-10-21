import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelAppFormComponent } from './hotel-app-form.component';

describe('HotelAppFormComponent', () => {
  let component: HotelAppFormComponent;
  let fixture: ComponentFixture<HotelAppFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelAppFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelAppFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
