import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyFormFieldDatepickerComponent } from './thy-form-field-datepicker.component';

describe('ThyFormFieldDatepickerComponent', () => {
  let component: ThyFormFieldDatepickerComponent;
  let fixture: ComponentFixture<ThyFormFieldDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyFormFieldDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyFormFieldDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
