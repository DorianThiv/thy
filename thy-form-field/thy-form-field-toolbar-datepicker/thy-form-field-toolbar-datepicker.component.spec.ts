import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyFormFieldToolbarDatepickerComponent } from './thy-form-field-toolbar-datepicker.component';

describe('ThyFormFieldToolbarDatepickerComponent', () => {
  let component: ThyFormFieldToolbarDatepickerComponent;
  let fixture: ComponentFixture<ThyFormFieldToolbarDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyFormFieldToolbarDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyFormFieldToolbarDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
