import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { logoutRequest } from '../../store/global/global-actions';
import { ApplicationState } from '../../app.module';
import { NavigationTab, Role } from '../../types/data-types';
import { getUserRole } from 'src/app/store/global/global-reducer';

@Component({
  selector: 'app-authenticated-app',
  templateUrl: './authenticated-app.component.html',
  styleUrls: ['./authenticated-app.component.scss']
})
export class AuthenticatedAppComponent implements OnInit, OnDestroy {

  tabs: Array<NavigationTab>;
  loading$: Observable<boolean>;
  isAdmin: boolean = true;
  translationSub: Subscription;
  signOutTab: NavigationTab;
  role: Role;

  constructor(private store: Store<ApplicationState>,
    private translate: TranslateService) {
      this.store.select(getUserRole).subscribe(value => {
        this.role = value;
      });
      console.log('User role:', this.role);
  }

  ngOnInit(): void {
    this.translationSub =  this.translate.get('navigation-pane').subscribe(translations => {
      this.init(translations);
     });
  }

   init(translations: { [key: string]: string }) {
    if (this.role == Role.admin) {
      this.tabs = [
        {
          tabName: translations['requests'],
          tabId: "0",
          href: 'administrator/requests'
        },
        {
          tabName: translations['reports'],
          tabId: "1",
          href: "administrator/charts"
        }
      ];
    } else {
      this.tabs = [
        {
          tabName: translations['requests'],
          tabId: "0",
          href: 'requester'
        }
      ];
    }

    this.signOutTab = {
      tabName: translations['sign-out'],
      tabId: String(this.tabs.length)
    }
  }

  signOut() {
    this.store.dispatch(logoutRequest());
  }

  ngOnDestroy() {
    this.translationSub.unsubscribe();
  }
}
