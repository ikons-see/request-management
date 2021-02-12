import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedRequestsChartComponent } from './assigned-requests-chart.component';

describe('AssignedRequestsChartComponent', () => {
  let component: AssignedRequestsChartComponent;
  let fixture: ComponentFixture<AssignedRequestsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignedRequestsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedRequestsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
