import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyLayoutVerticalComponent } from './thy-layout-vertical.component';

describe('ThyLayoutVerticalComponent', () => {
  let component: ThyLayoutVerticalComponent;
  let fixture: ComponentFixture<ThyLayoutVerticalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyLayoutVerticalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyLayoutVerticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
