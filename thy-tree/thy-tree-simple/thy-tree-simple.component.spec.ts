import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyTreeSimpleComponent } from './thy-tree-simple.component';

describe('ThyTreeSimpleComponent', () => {
  let component: ThyTreeSimpleComponent;
  let fixture: ComponentFixture<ThyTreeSimpleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyTreeSimpleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyTreeSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
