import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { BaseChartDirective, Label } from 'ng2-charts';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public barChartOptions: ChartOptions = {
    layout: {
      padding: 30
  },
    responsive: true,
    maintainAspectRatio: false,
  };
  public barChartLabels: Label[] = [
    '2006',
    '2007',
    '2008',
    '2009',
    '2010',
    '2011',
    '2012',
    '2013',
    '2014',
    '2015',
    '2016',
    '2017',
    '2018',
    '2019',
    '2020',
    '2021',
    '2022',
    '2023',
    '2024',
    '2025',
    '2026',
    '2027',
    '2028',
    '2029',
    '2030',
    '2031',
    '2032',
    '2033',
  ];
  //public barChartType: ChartType = 'bar';
  public barChartType: ChartType = 'horizontalBar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40, 28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40, 28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  constructor() {}

  ngOnInit() {}
}
