import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Tab } from 'src/app/types/data-types';

@Component({
  selector: 'app-active-requests-chart',
  templateUrl: './active-requests-chart.component.html',
  styleUrls: ['./active-requests-chart.component.scss']
})
export class ActiveRequestsChartComponent implements OnInit {

  totalRequests: number = 16;
  totalActiveRequests: number = 12;
  totalAssignedRequests: number = 2;

  private chart: am4charts.XYChart;

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) { }

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

    let activeChart = am4core.create("activeChartdiv", am4charts.PieChart);

    activeChart.data = [
      {
        "type": "Active Requests",
        "number": this.totalActiveRequests
      },
      {
        "type": "Closed Requests",
        "number": this.totalRequests - this.totalActiveRequests
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
