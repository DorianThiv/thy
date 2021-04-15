import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyFormFieldTextareaComponent } from './thy-form-field-textarea.component';

describe('ThyFormFieldTextareaComponent', () => {
  let component: ThyFormFieldTextareaComponent;
  let fixture: ComponentFixture<ThyFormFieldTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyFormFieldTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyFormFieldTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
