import { Component, OnInit } from '@angular/core';
import { Tab } from 'src/app/types/data-types';

@Component({
  selector: 'app-charts-view',
  templateUrl: './charts-view.component.html',
  styleUrls: ['./charts-view.component.scss']
})
export class ChartsViewComponent implements OnInit {

  tabs: Array<Tab>;
  activeTab: string = '0';

  constructor() {
    this.tabs = [
      {
        id: '0',
        name: 'Active Requests',
        onClick: (e) => this.tabChanged(e)
      },
      {
        id: '1',
        name: 'Assigned Requests',
        onClick: (e) => this.tabChanged(e)
      },
      {
        id: '2',
        name: 'Monthly Requests',
        onClick: (e) => this.tabChanged(e)
      },
      {
        id: '3',
        name: 'Something else',
        onClick: (e) => this.tabChanged(e)
      },
    ];
  }

  ngOnInit() { }

  tabChanged(e) {
    this.activeTab = e;
  }

  handleClick(e) {

  }
}
