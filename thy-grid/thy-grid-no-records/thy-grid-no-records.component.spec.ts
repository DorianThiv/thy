import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyGridNoRecordsComponent } from './thy-grid-no-records.component';

describe('ThyGridNoRecordsComponent', () => {
  let component: ThyGridNoRecordsComponent;
  let fixture: ComponentFixture<ThyGridNoRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyGridNoRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyGridNoRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
