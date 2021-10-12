import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighligtCardComponent } from './highligt-card.component';

describe('HighligtCardComponent', () => {
  let component: HighligtCardComponent;
  let fixture: ComponentFixture<HighligtCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HighligtCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HighligtCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
