import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { ApplicationState } from './app.module';
import { getAvailableLanguages } from './store/global/global-reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'requests-management';

  constructor(private translate: TranslateService,
    private store: Store<ApplicationState>) {
    const availableLanguages$ = this.store.select(getAvailableLanguages);

    availableLanguages$
      .pipe(distinctUntilChanged())
      .subscribe(languageCodes => {
        this.translate.addLangs(languageCodes);
      });
    this.translate.setDefaultLang('en');
  }
}
