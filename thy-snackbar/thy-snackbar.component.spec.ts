import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThySnackbarComponent } from './thy-snackbar.component';

describe('ThySnackbarComponent', () => {
  let component: ThySnackbarComponent;
  let fixture: ComponentFixture<ThySnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThySnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThySnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
