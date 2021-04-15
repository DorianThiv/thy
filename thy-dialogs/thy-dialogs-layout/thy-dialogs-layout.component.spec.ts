import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyDialogsLayoutComponent } from './thy-dialogs-layout.component';

describe('ThyDialogsLayoutComponent', () => {
  let component: ThyDialogsLayoutComponent;
  let fixture: ComponentFixture<ThyDialogsLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyDialogsLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyDialogsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
