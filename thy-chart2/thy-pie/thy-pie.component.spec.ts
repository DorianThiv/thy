import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyPieComponent } from './thy-pie.component';

describe('ThyPieComponent', () => {
  let component: ThyPieComponent;
  let fixture: ComponentFixture<ThyPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
