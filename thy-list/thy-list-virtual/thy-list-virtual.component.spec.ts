import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyListVirtualComponent } from './thy-list-virtual.component';

describe('ThyListVirtualComponent', () => {
  let component: ThyListVirtualComponent;
  let fixture: ComponentFixture<ThyListVirtualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThyListVirtualComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyListVirtualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
