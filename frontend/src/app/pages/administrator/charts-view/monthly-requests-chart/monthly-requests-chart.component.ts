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
    chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

    chart.data = [
      {
        month: "January",
        total: 25
      },
      {
        month: "February",
        total: 4
      },
      {
        month: "March",
        total: 0
      },
      {
        month: "April",
        total: 16
      },
      {
        month: "May",
        total: 30
      },
      {
        month: "June",
        total: 0
      },
      {
        month: "July",
        total: 8
      },
      {
        month: "August",
        total: 20
      },
      {
        month: "September",
        total: 10
      },
      {
        month: "October",
        visits: 5
      },
      {
        month: "November",
        visits: 0
      },
      {
        month: "December",
        visits: 0
      }
    ];

    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.dataFields.category = "month";
    categoryAxis.renderer.minGridDistance = 40;
    categoryAxis.fontSize = 11;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.min = 0;
    valueAxis.max = 50;
    valueAxis.strictMinMax = true;
    valueAxis.renderer.minGridDistance = 30;
    // axis break
    // let axisBreak = valueAxis.axisBreaks.create();
    // axisBreak.startValue = 5;
    // axisBreak.endValue = 20;
    //axisBreak.breakSize = 0.005;

    // fixed axis break
    // let d = (axisBreak.endValue - axisBreak.startValue) / (valueAxis.max - valueAxis.min);
    // axisBreak.breakSize = 0.05 * (1 - d) / d; // 0.05 means that the break will take 5% of the total value axis height

    // make break expand on hover
    // let hoverState = axisBreak.states.create("hover");
    // hoverState.properties.breakSize = 1;
    // hoverState.properties.opacity = 0.1;
    // hoverState.transitionDuration = 1500;

    // axisBreak.defaultState.transitionDuration = 1000;


    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = "month";
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
