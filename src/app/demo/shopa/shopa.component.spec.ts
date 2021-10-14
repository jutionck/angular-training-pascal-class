import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopaComponent } from './shopa.component';

describe('ShopaComponent', () => {
  let component: ShopaComponent;
  let fixture: ComponentFixture<ShopaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
