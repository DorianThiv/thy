import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyGraphComponent } from './thy-graph.component';

describe('ThyGraphComponent', () => {
  let component: ThyGraphComponent;
  let fixture: ComponentFixture<ThyGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
