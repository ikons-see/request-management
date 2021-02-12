import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
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
} from '../../store/requests/requests-actions';
import {
  getCurrentPage,
  getErrorMessage,
  getFilters,
  getLoadingRequests,
  getRequestsList,
  getTotalNumber
} from '../../store/requests/requests-reducer';
import { ActionType, ColumnType, DropdownColumn, RequestStatus, TableConfig } from '../../types/data-types';
import { RequestDetails, RequestFilters } from '../../types/request-types';

@Component({
  selector: 'app-requester',
  templateUrl: './requester.component.html',
  styleUrls: ['./requester.component.scss']
})
export class RequesterComponent implements OnInit, OnDestroy {

  tableConfiguration: TableConfig;
  dropdownConfig: DropdownColumn;
  requests$: Observable<Array<RequestDetails>>;
  totalNumber$: Observable<number>;
  currentPage$: Observable<number>;
  errorMessage$: Observable<string>;
  loading$: Observable<boolean>;
  showFilters: boolean = false;
  filters: RequestFilters;
  filtersSubscribtion: Subscription;
  translationSub: Subscription;
  itemsPerPage: number = 10;
  links: any;
  page: number;
  predicate = 'requestId';
  ascending: boolean;

  constructor(private store: Store<ApplicationState>,
    private translate: TranslateService) {
    this.loadData(0);

    this.currentPage$ = this.store.select(getCurrentPage);
    this.requests$ = this.store.select(getRequestsList);
    this.totalNumber$ = this.store.select(getTotalNumber);
    this.loading$ = this.store.select(getLoadingRequests);
    this.errorMessage$ = this.store.select(getErrorMessage);

    this.filtersSubscribtion = this.store.select(getFilters).subscribe(value => {
      this.filters = value;
    });
    this.predicate = 'requestId';
    this.ascending = true;
  }

  ngOnInit(): void {
    this.translationSub =  this.translate.get('requester').subscribe(translations => {
      this.init(translations);
     });
  }

  loadData(page: number) {
    this.store.dispatch(requestData({ query: {page} }));
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'requestId') {
      result.push('requestId');
    }
    return result;
  }

  init(translations: { [key: string]: string }) {
    this.dropdownConfig = {
      button: {
        text: translations['actions'],
        icon: ''
      },
      values: [
        {
          text: translations['view-details'],
          icon: 'fa-list',
          onClick: (e) => this.openDetailsModal(e)
        },
        {
          text: translations['edit'],
          icon: 'fa-edit',
          action: ActionType.edit,
          onClick: (e) => this.openEditRequestModal(e)
        },
        {
          text: translations['delete'],
          icon: 'fa-trash',
          onClick: (e) => this.deleteRequest(e)
        },
        {
          text: translations['close'],
          icon: 'fa-close',
          action: ActionType.close,
          onClick: (e) => this.closeRequest(e)
        }
      ]
    };

    this.tableConfiguration = {
      columns: [
        {
          type: ColumnType.STRING,
          field: 'areaOfInterest',
          text: translations['area-of-interest']
        },
        {
          type: ColumnType.STATUS,
          field: 'status',
          text: translations['status']
        },
        {
          type: ColumnType.DATE,
          field: 'startDate',
          text: translations['start-date']
        },
        {
          type: ColumnType.DATE,
          field: 'endDate',
          text: translations['end-date']
        },
        {
          type: ColumnType.DROPDOWN,
          field: 'requestId',
          text: translations['manage-request'],
          defaultContent: (datum) => this.dropdownConfig
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
    this.translationSub.unsubscribe();
  }
}
