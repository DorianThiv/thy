import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyFormFieldDatetimepickerComponent } from './thy-form-field-datetimepicker.component';

describe('ThyFormFieldDatetimepickerComponent', () => {
  let component: ThyFormFieldDatetimepickerComponent;
  let fixture: ComponentFixture<ThyFormFieldDatetimepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyFormFieldDatetimepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyFormFieldDatetimepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
