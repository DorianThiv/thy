import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyHeatmapComponent } from './thy-heatmap.component';

describe('ThyHeatmapComponent', () => {
  let component: ThyHeatmapComponent;
  let fixture: ComponentFixture<ThyHeatmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThyHeatmapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThyHeatmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
