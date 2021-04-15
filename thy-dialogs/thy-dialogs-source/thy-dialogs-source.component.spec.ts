import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyDialogsSourceComponent } from './thy-dialogs-source.component';

describe('ThyDialogsSourceComponent', () => {
  let component: ThyDialogsSourceComponent;
  let fixture: ComponentFixture<ThyDialogsSourceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyDialogsSourceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyDialogsSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
