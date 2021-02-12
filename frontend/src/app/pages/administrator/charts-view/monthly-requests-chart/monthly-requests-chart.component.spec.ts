import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyRequestsChartComponent } from './monthly-requests-chart.component';

describe('MonthlyRequestsChartComponent', () => {
  let component: MonthlyRequestsChartComponent;
  let fixture: ComponentFixture<MonthlyRequestsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonthlyRequestsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthlyRequestsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
