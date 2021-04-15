import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyTreeExtendedComponent } from './thy-tree-extended.component';

describe('ThyTreeExtendedComponent', () => {
  let component: ThyTreeExtendedComponent;
  let fixture: ComponentFixture<ThyTreeExtendedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyTreeExtendedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyTreeExtendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
