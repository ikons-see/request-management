import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyResourcesChartComponent } from './monthly-resources-chart.component';

describe('MonthlyResourcesChartComponent', () => {
  let component: MonthlyResourcesChartComponent;
  let fixture: ComponentFixture<MonthlyResourcesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyResourcesChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyResourcesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
