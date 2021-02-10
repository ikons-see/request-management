import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';
import { ApplicationState } from 'src/app/app.module';
import { deleteRequest } from 'src/app/store/requester/requester-actions';
import { getLoadingRequests } from 'src/app/store/requester/requester-reducer';
import { ButtonConfiguration, ButtonType } from 'src/app/types/data-types';

@Component({
  selector: 'app-delete-details-modal',
  templateUrl: './delete-details-modal.component.html',
  styleUrls: ['./delete-details-modal.component.scss']
})
export class DeleteRequestModalComponent implements OnInit, OnDestroy {

  @Input()
  requestId: number;

  @Input()
  title: string;

  buttons: Array<ButtonConfiguration>;
  loading$: Observable<boolean>;
  translationSub: Subscription;

  constructor(private store: Store<ApplicationState>,
    public bsModalRef: BsModalRef,
    private translate: TranslateService) {
    this.loading$ = this.store.select(getLoadingRequests);
   }

  ngOnInit(): void {
    this.translationSub =  this.translate.get('delete-request').subscribe(translations => {
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
        onClick: (e) => this.deleteRequest()
      }
    ]
  }

  deleteRequest() {
    this.store.dispatch(deleteRequest({requestId: this.requestId}));
  }

  closeModal() {
    this.bsModalRef.hide();
  }

  ngOnDestroy() {
    this.translationSub.unsubscribe();
  }
}
