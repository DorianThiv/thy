import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyFormFieldAutocompleteLazyComponent } from './thy-form-field-autocomplete-lazy.component';

describe('ThyFormFieldAutocompleteLazyComponent', () => {
  let component: ThyFormFieldAutocompleteLazyComponent;
  let fixture: ComponentFixture<ThyFormFieldAutocompleteLazyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThyFormFieldAutocompleteLazyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyFormFieldAutocompleteLazyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
