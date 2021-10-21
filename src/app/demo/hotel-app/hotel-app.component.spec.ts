import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelAppComponent } from './hotel-app.component';

describe('HotelAppComponent', () => {
  let component: HotelAppComponent;
  let fixture: ComponentFixture<HotelAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
