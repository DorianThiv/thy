import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyPeriodComponent } from './thy-period.component';

describe('ThyPeriodComponent', () => {
  let component: ThyPeriodComponent;
  let fixture: ComponentFixture<ThyPeriodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyPeriodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
