import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyFileImportComponent } from './thy-file-import.component';

describe('ThyFileImportComponent', () => {
  let component: ThyFileImportComponent;
  let fixture: ComponentFixture<ThyFileImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThyFileImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyFileImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
