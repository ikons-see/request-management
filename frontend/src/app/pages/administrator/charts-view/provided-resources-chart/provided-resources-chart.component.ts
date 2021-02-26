import {AfterViewInit, Component, Inject, NgZone, OnInit, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Tab } from 'src/app/types/data-types';
import { ProvidedResourcesData, TotalChartData } from 'src/app/types/response-types';
import { ApplicationState } from 'src/app/app.module';
import { Store } from '@ngrx/store';
import { downloadReportRequest } from 'src/app/store/administrator/administrator-actions';
import { getProvidedResourcesChartData } from 'src/app/store/administrator/administrator-reducer';

@Component({
  selector: 'app-provided-resources-chart',
  templateUrl: './provided-resources-chart.component.html',
  styleUrls: ['./provided-resources-chart.component.scss']
})
export class ProvidedResourcesChartComponent implements OnInit, AfterViewInit {
  totalRequests: number = 16;
  totalActiveRequests: number = 12;
  totalAssignedRequests: number = 2;
  chartData: ProvidedResourcesData;

  private chart: am4charts.XYChart;

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone, private store: Store<ApplicationState>) {
    this.store.select(getProvidedResourcesChartData).pipe().subscribe(value => {
      this.chartData = value;
    });
  }

  ngOnInit(): void {
  }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {

    let activeChart = am4core.create("providedResourcesChart", am4charts.PieChart);

    activeChart.data = [
      {
        "type": "Required Resources",
        "number": this.chartData.totalRequiredResources
      },
      {
        "type": "Provided Resources",
        "number": this.chartData.totalProvidedResources
      },
    ];

    let activePieSeries = activeChart.series.push(new am4charts.PieSeries());
    activePieSeries.dataFields.value = "number";
    activePieSeries.dataFields.category = "type";
    activePieSeries.slices.template.stroke = am4core.color("#fff");
    activePieSeries.slices.template.strokeWidth = 2;
    activePieSeries.slices.template.strokeOpacity = 1;

    // This creates initial animation
    activePieSeries.hiddenState.properties.opacity = 1;
    activePieSeries.hiddenState.properties.endAngle = -90;
    activePieSeries.hiddenState.properties.startAngle = -90;
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }

  downloadReport() {
    this.store.dispatch(downloadReportRequest());
  }
}
