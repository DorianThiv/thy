import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyPeriodSelectionComponent } from './thy-period-selection.component';

describe('ThyPeriodSelectionComponent', () => {
  let component: ThyPeriodSelectionComponent;
  let fixture: ComponentFixture<ThyPeriodSelectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyPeriodSelectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyPeriodSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
