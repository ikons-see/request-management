import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ApplicationState } from '../../app.module';
import {
  addRequestFilters,
  openAddRequestModal,
  openCloseRequestModal,
  openDeleteRequestModal,
  openEditRequestModal,
  openViewDetailsModal,
  pageChanged,
  requestData,
  resetRequestFilters
} from '../../store/requester/requester-actions';
import {
  getCurrentPage,
  getErrorMessage,
  getFilters,
  getLoadingRequests,
  getRequestsList,
  getTotalNumber
} from '../../store/requester/requester-reducer';
import { ColumnType, DropdownColumn, TableConfig } from '../../types/data-types';
import { RequestDetails, RequestFilters } from '../../types/request-types';

@Component({
  selector: 'app-requester',
  templateUrl: './requester.component.html',
  styleUrls: ['./requester.component.scss']
})
export class RequesterComponent implements OnInit, OnDestroy {

  tableConfiguration: TableConfig;
  requests$: Observable<Array<RequestDetails>>;
  totalNumber$: Observable<number>;
  currentPage$: Observable<number>;
  errorMessage$: Observable<string>;
  loading$: Observable<boolean>;
  showFilters: boolean = false;
  filters: RequestFilters;
  filtersSubscribtion: Subscription;

  constructor(private store: Store<ApplicationState>) {
    this.loadData(1);

    this.currentPage$ = this.store.select(getCurrentPage);
    this.requests$ = this.store.select(getRequestsList);
    this.totalNumber$ = this.store.select(getTotalNumber);
    this.loading$ = this.store.select(getLoadingRequests);
    this.errorMessage$ = this.store.select(getErrorMessage);

    this.filtersSubscribtion = this.store.select(getFilters).subscribe(value => {
      this.filters = value;
    });
  }

  ngOnInit(): void {
    this.initTable();
  }

  loadData(page: number) {
    this.store.dispatch(requestData({ page }));
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

  closeRequest(e) {
    this.store.dispatch(openCloseRequestModal({requestId: e}));
  }

  applyFilters(e) {
    this.store.dispatch(addRequestFilters({requestFilters: e}));
  }

  resetFilters() {
    this.store.dispatch(resetRequestFilters());
  }

  ngOnDestroy() {
    this.filtersSubscribtion.unsubscribe();
  }
}
