import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logoutRequest } from '../../store/global/global-actions';
import { ApplicationState } from '../../app.module';
import { NavigationTab } from '../../types/data-types';

@Component({
  selector: 'app-authenticated-app',
  templateUrl: './authenticated-app.component.html',
  styleUrls: ['./authenticated-app.component.scss']
})
export class AuthenticatedAppComponent implements OnInit {

  tabs: Array<NavigationTab>;
  loading$: Observable<boolean>;
  isAdmin: boolean = true;

  constructor(private store: Store<ApplicationState>) {
    this.initTabs();
  }

  ngOnInit(): void {
  }

  initTabs() {
    if (this.isAdmin) {
      this.tabs = [
        {
          tabName: 'Requests',
          tabId: "0",
          href: 'administrator/requests'
        },
        {
          tabName: 'Charts',
          tabId: "1",
          href: "administrator/charts"
        }
      ];
    } else {
      this.tabs = [
        {
          tabName: 'Requests',
          tabId: "0",
          href: 'requester'
        }
      ];
    }
  }

  signOut() {
    this.store.dispatch(logoutRequest());
  }
}
