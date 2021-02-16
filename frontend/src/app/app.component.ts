import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { ApplicationState } from './app.module';
import { getAvailableLanguages, getCurrentLanguage } from './store/common/common-reducer';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'requests-management';

  constructor(private translate: TranslateService,
    private store: Store<ApplicationState>,
    private localeService: BsLocaleService) {
    const availableLanguages$ = this.store.select(getAvailableLanguages);
    const currentLanguage$ = this.store.select(getCurrentLanguage);

    availableLanguages$
      .pipe(distinctUntilChanged())
      .subscribe(languageCodes => {
        this.translate.addLangs(languageCodes);
      });

      currentLanguage$.pipe(distinctUntilChanged())
      .subscribe(currentLang => {
        this.localeService.use(currentLang);
      });
    this.translate.setDefaultLang('en');
  }
}
