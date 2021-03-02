import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApplicationState } from 'src/app/app.module';
import { getProvidedResources, getRequestsMonthlyData, getResourcesMonthlyData, getTotalChartsData } from 'src/app/store/administrator/administrator-actions';
import { getLoadingRequests } from 'src/app/store/administrator/administrator-reducer';
import { Tab } from 'src/app/types/data-types';

@Component({
  selector: 'app-charts-view',
  templateUrl: './charts-view.component.html',
  styleUrls: ['./charts-view.component.scss']
})
export class ChartsViewComponent implements OnInit {

  tabs: Array<Tab>;
  activeTab: string = '0';
  loading$: Observable<boolean>;

  constructor(private store: Store<ApplicationState>) {
    this.tabs = [
      {
        id: '0',
        name: 'Total Requests',
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
        name: 'Monthly Resources',
        onClick: (e) => this.tabChanged(e)
      },
      {
        id: '4',
        name: 'Provided Resources',
        onClick: (e) => this.tabChanged(e)
      },
    ];
    this.store.dispatch(getTotalChartsData());
    this.store.dispatch(getRequestsMonthlyData());
    this.store.dispatch(getResourcesMonthlyData());
    this.store.dispatch(getProvidedResources());
    this.loading$ = this.store.select(getLoadingRequests);
  }

  ngOnInit() { }

  tabChanged(e) {
    this.activeTab = e;
  }

  handleClick(e) {

  }
}
