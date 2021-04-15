import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyLayoutComponent } from './thy-layout.component';

describe('ThyLayoutComponent', () => {
  let component: ThyLayoutComponent;
  let fixture: ComponentFixture<ThyLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
