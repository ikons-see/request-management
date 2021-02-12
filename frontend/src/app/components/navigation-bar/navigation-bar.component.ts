import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ApplicationState } from 'src/app/app.module';
import { changeLanguage } from 'src/app/store/common/common-actions';
import { getAvailableLanguages, getCurrentLanguage } from 'src/app/store/common/common-reducer';
import { NavigationTab } from 'src/app/types/data-types';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  @Input()
  tabs: Array<NavigationTab>;

  @Output()
  signingOut = new EventEmitter();

  @Input()
  signOutTab: NavigationTab;

  availableLanguages$: Observable<Array<string>>;
  currentLang$: Observable<string>;
  isNavbarCollapsed: boolean = false;
  showLang = false;

  constructor(private translate: TranslateService,
    private store: Store<ApplicationState>) { 
      this.availableLanguages$ = this.store.select(getAvailableLanguages);
      this.currentLang$ = this.store.select(getCurrentLanguage);
  }

  ngOnInit(): void {
  }

  signOut() {
    this.signingOut.emit();
  }

  changeLanguage(lang: string){
    this.showLang = false;
    this.store.dispatch(changeLanguage({language: lang}));
  }

  chooseLang() {
    this.showLang = !this.showLang;
  }
  
}
