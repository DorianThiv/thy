import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyFormFieldToolbarInputComponent } from './thy-form-field-toolbar-input.component';

describe('ThyFormFieldToolbarInputComponent', () => {
  let component: ThyFormFieldToolbarInputComponent;
  let fixture: ComponentFixture<ThyFormFieldToolbarInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyFormFieldToolbarInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyFormFieldToolbarInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
