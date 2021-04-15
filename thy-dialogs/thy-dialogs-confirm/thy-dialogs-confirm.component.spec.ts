import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyDialogsConfirmComponent } from './thy-dialogs-confirm.component';

describe('ThyDialogsConfirmComponent', () => {
  let component: ThyDialogsConfirmComponent;
  let fixture: ComponentFixture<ThyDialogsConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyDialogsConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyDialogsConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
