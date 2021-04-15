import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyFieldsetComponent } from './thy-fieldset.component';

describe('ThyFieldsetComponent', () => {
  let component: ThyFieldsetComponent;
  let fixture: ComponentFixture<ThyFieldsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyFieldsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyFieldsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
