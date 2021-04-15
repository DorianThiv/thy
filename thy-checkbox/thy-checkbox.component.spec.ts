import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyCheckboxComponent } from './thy-checkbox.component';

describe('ThyCheckboxComponent', () => {
  let component: ThyCheckboxComponent;
  let fixture: ComponentFixture<ThyCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
