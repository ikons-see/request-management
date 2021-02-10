import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ApplicationState } from '../../../app.module';
import { closeRequest } from '../../../store/requester/requester-actions';
import { ButtonConfiguration, ButtonType } from '../../../types/data-types';

@Component({
  selector: 'app-close-request-modal',
  templateUrl: './close-request-modal.component.html',
  styleUrls: ['./close-request-modal.component.scss']
})
export class CloseRequestModalComponent implements OnInit, OnDestroy {

  @Input()
  requestId: number;

  @Input()
  title: string;

  buttons: Array<ButtonConfiguration>;
  translationSub: Subscription;
  
  constructor(private store: Store<ApplicationState>,
    public bsModalRef: BsModalRef,
    private translate: TranslateService) {
   }

  ngOnInit(): void {
    this.translationSub =  this.translate.get('close-request').subscribe(translations => {
      this.initButtons(translations);
     });
  }

  initButtons(translations: { [key: string]: string }) {
    this.buttons = [
      {
        text: translations['cancel'],
        type: ButtonType.SECONDARY,
        onClick: (e) => this.closeModal()
      },
      {
        text: translations['continue'],
        type: ButtonType.DARK,
        onClick: (e) => this.closeRequest()
      }
    ]
  }

  closeRequest() {
    this.store.dispatch(closeRequest({requestId: this.requestId}));
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  ngOnDestroy() {
    this.translationSub.unsubscribe();
  }

}
