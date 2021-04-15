import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyChart2Component } from './thy-chart2.component';

describe('ThyChart2Component', () => {
  let component: ThyChart2Component;
  let fixture: ComponentFixture<ThyChart2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyChart2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyChart2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
