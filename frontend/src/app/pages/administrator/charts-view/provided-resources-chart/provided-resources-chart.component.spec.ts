import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidedResourcesChartComponent } from './provided-resources-chart.component';

describe('ProvidedResourcesChartComponent', () => {
  let component: ProvidedResourcesChartComponent;
  let fixture: ComponentFixture<ProvidedResourcesChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvidedResourcesChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvidedResourcesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
