import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyGaugeComponent } from './thy-gauge.component';

describe('ThyGaugeComponent', () => {
  let component: ThyGaugeComponent;
  let fixture: ComponentFixture<ThyGaugeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyGaugeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
