import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyToolbarMiniComponent } from './thy-toolbar-mini.component';

describe('ThyToolbarMiniComponent', () => {
  let component: ThyToolbarMiniComponent;
  let fixture: ComponentFixture<ThyToolbarMiniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThyToolbarMiniComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyToolbarMiniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
