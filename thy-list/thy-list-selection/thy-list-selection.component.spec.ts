import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyListSelectionComponent } from './thy-list-selection.component';

describe('ThyListSelectionComponent', () => {
  let component: ThyListSelectionComponent;
  let fixture: ComponentFixture<ThyListSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThyListSelectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyListSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
