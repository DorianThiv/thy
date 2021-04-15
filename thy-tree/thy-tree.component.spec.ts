import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyTreeComponent } from './thy-tree.component';

describe('ThyTreeComponent', () => {
  let component: ThyTreeComponent;
  let fixture: ComponentFixture<ThyTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
