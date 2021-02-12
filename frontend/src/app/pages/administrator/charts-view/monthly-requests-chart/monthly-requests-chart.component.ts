import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';

/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

@Component({
  selector: 'app-monthly-requests-chart',
  templateUrl: './monthly-requests-chart.component.html',
  styleUrls: ['./monthly-requests-chart.component.scss']
})
export class MonthlyRequestsChartComponent implements OnInit {


  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) {
    am4core.useTheme(am4themes_animated);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.hiddenState.properties.opacity = 0;

    chart.data = [
      {
        month: new Date('2021-03-12T09:51:51.188+00:00'),
        total: 25
      },
      {
        month:  new Date(2020, 2),
        total: 4
      },
      {
        month:  new Date(2020, 3),
        total: 0
      },
      {
        month:  new Date(2020, 4),
        total: 16
      },
      {
        month:  new Date(2020, 5),
        total: 30
      },
      {
        month:  new Date(2020, 6),
        total: 0
      },
      {
        month:  new Date(2020, 7),
        total: 8
      }
    ];

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
    series.dataFields.dateX = "month";
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
