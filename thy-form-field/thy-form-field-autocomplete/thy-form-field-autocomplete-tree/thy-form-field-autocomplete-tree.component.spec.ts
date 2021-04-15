import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyFormFieldAutocompleteTreeComponent } from './thy-form-field-autocomplete-tree.component';

describe('ThyFormFieldAutocompleteTreeComponent', () => {
  let component: ThyFormFieldAutocompleteTreeComponent;
  let fixture: ComponentFixture<ThyFormFieldAutocompleteTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyFormFieldAutocompleteTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyFormFieldAutocompleteTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
