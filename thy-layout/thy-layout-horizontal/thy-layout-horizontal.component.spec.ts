import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyLayoutHorizontalComponent } from './thy-layout-horizontal.component';

describe('ThyLayoutHorizontalComponent', () => {
  let component: ThyLayoutHorizontalComponent;
  let fixture: ComponentFixture<ThyLayoutHorizontalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyLayoutHorizontalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyLayoutHorizontalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
