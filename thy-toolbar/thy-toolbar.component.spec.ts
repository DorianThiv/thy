import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyToolbarComponent } from './thy-toolbar.component';

describe('ThyToolbarComponent', () => {
  let component: ThyToolbarComponent;
  let fixture: ComponentFixture<ThyToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
