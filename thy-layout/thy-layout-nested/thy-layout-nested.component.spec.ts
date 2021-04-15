import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyLayoutNestedComponent } from './thy-layout-nested.component';

describe('ThyLayoutNestedComponent', () => {
  let component: ThyLayoutNestedComponent;
  let fixture: ComponentFixture<ThyLayoutNestedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyLayoutNestedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyLayoutNestedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
