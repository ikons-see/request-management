import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';

/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { MonthlyChartData } from 'src/app/types/response-types';
import { ApplicationState } from 'src/app/app.module';
import { getRequestsChartData } from 'src/app/store/administrator/administrator-reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-monthly-requests-chart',
  templateUrl: './monthly-requests-chart.component.html',
  styleUrls: ['./monthly-requests-chart.component.scss']
})
export class MonthlyRequestsChartComponent implements OnInit {

  chartData: Array<MonthlyChartData>;

  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone, private store: Store<ApplicationState>) {
    am4core.useTheme(am4themes_animated);
    this.store.select(getRequestsChartData).pipe().subscribe(value => {
      this.chartData = value;
    })
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0;

    chart.data = this.chartData;

    var categoryAxis = chart.xAxes.push(new am4charts.DateAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.minGridDistance = 40;
    categoryAxis.fontSize = 11;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 50;
    valueAxis.strictMinMax = true;
    valueAxis.renderer.minGridDistance = 30;



    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.dateX = "period";
    series.dataFields.valueY = "total";
    series.columns.template.tooltipText = "{valueY.value}";
    series.columns.template.tooltipY = 0;
    series.columns.template.strokeOpacity = 0;

    // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
    series.columns.template.adapter.add("fill", function (fill, target) {
      return chart.colors.getIndex(target.dataItem.index);
    });
  }

}
