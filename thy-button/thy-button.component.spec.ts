import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyButtonComponent } from './thy-button.component';

describe('ThyButtonComponent', () => {
  let component: ThyButtonComponent;
  let fixture: ComponentFixture<ThyButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
