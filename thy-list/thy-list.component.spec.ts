import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyListComponent } from './thy-list.component';

describe('ThyListComponent', () => {
  let component: ThyListComponent;
  let fixture: ComponentFixture<ThyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
