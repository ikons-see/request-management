import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveRequestsChartComponent } from './active-requests-chart.component';

describe('ActiveRequestsChartComponent', () => {
  let component: ActiveRequestsChartComponent;
  let fixture: ComponentFixture<ActiveRequestsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveRequestsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveRequestsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
