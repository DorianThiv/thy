import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyDialogsMessagesComponent } from './thy-dialogs-messages.component';

describe('ThyDialogsMessagesComponent', () => {
  let component: ThyDialogsMessagesComponent;
  let fixture: ComponentFixture<ThyDialogsMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyDialogsMessagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyDialogsMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
