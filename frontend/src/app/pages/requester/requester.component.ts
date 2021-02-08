import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ApplicationState } from 'src/app/app.module';
import {
  logoutRequest,
  openAddRequestModal,
  openCloseRequestModal,
  openDeleteRequestModal,
  openEditRequestModal,
  openViewDetailsModal,
  pageChanged,
  requestData
} from '../../store/requests-actions';
import {
  getCurrentPage,
  getErrorMessage,
  getLoadingRequests,
  getRequestsList,
  getTotalNumber
} from '../../store/requests-reducer';
import { ColumnType, DropdownColumn, NavigationTab, TableConfig } from '../../types/data-types';
import { RequestDetails } from '../../types/request-types';

@Component({
  selector: 'app-requester',
  templateUrl: './requester.component.html',
  styleUrls: ['./requester.component.scss']
})
export class RequesterComponent implements OnInit {

  tabs: Array<NavigationTab>;
  tableConfiguration: TableConfig;
  requests$: Observable<Array<RequestDetails>>;
  totalNumber$: Observable<number>;
  currentPage$: Observable<number>;
  errorMessage$: Observable<string>;
  loading$: Observable<boolean>;
  showFilters: boolean = false;

  private subscriptions: Subscription[] = [];

  constructor(private store: Store<ApplicationState>) {
    this.initTabs();
    this.loadData(1);

    this.currentPage$ = this.store.select(getCurrentPage);
    this.requests$ = this.store.select(getRequestsList);
    this.totalNumber$ = this.store.select(getTotalNumber);
    this.loading$ = this.store.select(getLoadingRequests);
    this.errorMessage$ = this.store.select(getErrorMessage);
  }

  ngOnInit(): void {
    this.initTable();
  }

  loadData(page: number) {
    this.store.dispatch(requestData({ page }));
  }

  tabClicked(e) {
    console.log(e);
  }

  initDropdown(): DropdownColumn {
    return {
      button: {
        text: 'Actions',
        icon: ''
      },
      values: [
        {
          text: 'View details',
          icon: 'fa-list',
          onClick: (e) => this.openDetailsModal(e)
        },
        {
          text: 'Edit',
          icon: 'fa-edit',
          onClick: (e) => this.openEditRequestModal(e)
        },
        {
          text: 'Delete',
          icon: 'fa-trash',
          onClick: (e) => this.deleteRequest(e)
        },
        {
          text: 'Close',
          icon: 'fa-close',
          onClick: (e) => this.closeRequest(e)
        }
      ]
    }
  };

  initTable() {
    this.tableConfiguration = {
      columns: [
        {
          type: ColumnType.STRING,
          field: 'areaOfInterest',
          text: 'Area of interest'
        },
        {
          type: ColumnType.STATUS,
          field: 'status',
          text: 'Status'
        },
        {
          type: ColumnType.DATE,
          field: 'startDate',
          text: 'Start Date'
        },
        {
          type: ColumnType.DATE,
          field: 'endDate',
          text: 'End Date'
        },
        {
          type: ColumnType.DROPDOWN,
          field: 'requestId',
          text: 'Manage Request',
          defaultContent: (datum) => this.initDropdown()
        }
      ]
    };
  }

  initTabs() {
    this.tabs = [
      {
        tabName: 'Requests',
        tabId: "0"
      },
      {
        tabName: 'Sign Out',
        tabId: '1',
        icon: 'fa-user',
        onClick: (e) => this.signOut()
      }];
  }

  toogleFiltersPanel() {
    this.showFilters = !this.showFilters;
  }

  addRequestModal() {
    this.store.dispatch(openAddRequestModal());
  }

  pageChanged(page: number) {
    this.loadData(page);
    this.store.dispatch(pageChanged({ page: page }));
  }

  openDetailsModal(e) {
    this.store.dispatch(openViewDetailsModal({ requestId: e }))
  }

  openEditRequestModal(e) {
    this.store.dispatch(openEditRequestModal({ requestId: e }));
  }

  deleteRequest(e) {
    this.store.dispatch(openDeleteRequestModal({ requestId: e }));
  }

  signOut() {
    this.store.dispatch(logoutRequest());
  }

  closeRequest(e) {
    this.store.dispatch(openCloseRequestModal({requestId: e}));
  }
}
