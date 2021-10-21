import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelAppListComponent } from './hotel-app-list.component';

describe('HotelAppListComponent', () => {
  let component: HotelAppListComponent;
  let fixture: ComponentFixture<HotelAppListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelAppListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelAppListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
