import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Tab } from 'src/app/types/data-types';
import { TotalChartData } from 'src/app/types/response-types';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/app.module';
import { getTotalChartData } from 'src/app/store/administrator/administrator-reducer';

@Component({
  selector: 'app-assigned-requests-chart',
  templateUrl: './assigned-requests-chart.component.html',
  styleUrls: ['./assigned-requests-chart.component.scss']
})
export class AssignedRequestsChartComponent implements OnInit {

  totalRequests: number = 16;
  totalAssignedRequests: number = 2;
  chartData: TotalChartData;

  private chart: am4charts.XYChart;

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone, private store: Store<ApplicationState>) {
    this.store.select(getTotalChartData).pipe().subscribe(value => {
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

    let activeChart = am4core.create("assignedchart", am4charts.PieChart);

    activeChart.data = [
      {
        "type": "Assigned Requests",
        "number": this.chartData.totalOnGoingRequests
      },
      {
        "type": "Unassigned Requests",
        "number": this.chartData.totalRequests - this.chartData.totalOnGoingRequests
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

}
