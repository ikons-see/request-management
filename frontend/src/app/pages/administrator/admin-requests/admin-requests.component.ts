import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ApplicationState } from '../../../app.module';
import { addRequestFilters, openViewDetailsModal, pageChanged, requestData, resetRequestFilters } from '../../../store/administrator/administrator-actions';
import { 
  getCurrentPage, 
  getErrorMessage, 
  getFilters, 
  getLoadingRequests, 
  getRequestsList, 
  getTotalNumber 
} from '../../../store/administrator/administrator-reducer';
import { ColumnType, DropdownColumn, TableConfig } from '../../../types/data-types';
import { RequestDetails, RequestFilters } from '../../../types/request-types';

@Component({
  selector: 'app-admin-requests',
  templateUrl: './admin-requests.component.html',
  styleUrls: ['./admin-requests.component.scss']
})
export class AdminRequestsComponent implements OnInit {

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
          text: 'View history',
          icon: 'fa-history',
          onClick: (e) => this.openViewHistoryModal(e)
        },
        {
          text: 'Take charge',
          icon: 'fa-edit',
          onClick: (e) => this.openTakeChargeModal(e)
        },
        {
          text: 'Reject',
          icon: 'fa-trash',
          onClick: (e) => this.openRejectRequestModal(e)
        },
        {
          text: 'Pending information',
          icon: 'fa-info-circle',
          onClick: (e) => this.openPendingInfoModal(e)
        },
        {
          text: 'Close',
          icon: 'fa-close',
          onClick: (e) => this.openCloseModal(e)
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

  loadData(page: number) {
    this.store.dispatch(requestData({ page }));
  }

  toogleFiltersPanel() {
    this.showFilters = !this.showFilters;
  }

  pageChanged(page: number) {
    this.loadData(page);
    this.store.dispatch(pageChanged({ page: page }));
  }

  openDetailsModal(e) {
    this.store.dispatch(openViewDetailsModal({ requestId: e }))
  }

  openTakeChargeModal(e) {
    console.log('Taking in charge');
  }

  openRejectRequestModal(e) {
    console.log('Rejecting request');
  }

  openPendingInfoModal(e) {
    console.log('Pending information');
  }

  openCloseModal(e) {
    console.log('Closing request');
  }

  openViewHistoryModal(e) {
    console.log('View history');
  }

  applyFilters(e) {
    this.store.dispatch(addRequestFilters({requestFilters: e}));
  }

  resetFilters() {
    this.store.dispatch(resetRequestFilters());
  }


}
