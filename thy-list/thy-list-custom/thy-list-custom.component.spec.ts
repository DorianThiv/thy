import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyListCustomComponent } from './thy-list-custom.component';

describe('ThyListCustomComponent', () => {
  let component: ThyListCustomComponent;
  let fixture: ComponentFixture<ThyListCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThyListCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyListCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
