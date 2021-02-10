import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ApplicationState } from 'src/app/app.module';
import { addNewRequest } from 'src/app/store/requester/requester-actions';
import { ButtonConfiguration, ButtonType, Tab } from 'src/app/types/data-types';
import { Resource } from 'src/app/types/request-types';
import { AddGeneralInfoComponent } from './add-general-info/add-general-info.component';

@Component({
  selector: 'app-add-request-modal',
  templateUrl: './add-request-modal.component.html',
  styleUrls: ['./add-request-modal.component.scss']
})
export class AddRequestModalComponent implements OnInit, OnDestroy {

  @Input()
  title: string;

  @ViewChild('general') childComponent: AddGeneralInfoComponent;

  buttons: Array<ButtonConfiguration>;
  generalButtons: Array<ButtonConfiguration>;
  resourcesButtons: Array<ButtonConfiguration>;
  tabs: Array<Tab>;
  activeId: string = '0';
  generalInfoForm: FormGroup;
  resourcesForm: FormGroup;
  resources: Array<Resource> = [];
  translationSub: Subscription;

  constructor(private formBuilder: FormBuilder,
    private store: Store<ApplicationState>,
    private translate: TranslateService) {
    this.generalInfoForm = this.formBuilder.group({
      areaOfInterest: ['', Validators.required],
      dateRange: [null, Validators.required],
      projectDescription: ['', Validators.required],
      notes: ['']
    });

    this.resourcesForm = this.formBuilder.group({
      total: ['', [Validators.required, Validators.min(1)]],
      seniority: ['', Validators.required],
      skills: [[]],
      note: ['']
    });
  }

  ngOnInit(): void {
    this.translationSub =  this.translate.get('requester.add-request').subscribe(translations => {
      this.init(translations);
     });
  }

  init(translations: { [key: string]: string }) {
    this.generalButtons = [
      {
        text: translations['next'],
        type: ButtonType.DARK,
        disabled: this.generalInfoForm.invalid,
        onClick: (e) => this.addResources()
      }
    ];

    this.resourcesButtons = [
      {
        text: translations['back'],
        type: ButtonType.SECONDARY,
        onClick: (e) => this.goBack(e)
      },
      {
        text: translations['add-request'],
        type: ButtonType.DARK,
        onClick: (e) => this.addRequest(e)
      }
    ];

    this.buttons = this.generalButtons;

    this.tabs = [
      {
        id: '0',
        name: translations['general-info'],
        onClick: (e) => this.tabChanged(e)
      },
      {
        id: '1',
        name: translations['resources'],
        onClick: (e) => this.tabChanged(e)
      }
    ];
  }

  tabChanged(e) {
    this.activeId = e;
  }

  addResources() {
    this.childComponent.onSubmit();
    if(this.generalInfoForm.valid) {
      this.tabChanged('1');
      this.buttons = this.resourcesButtons;
    }
  }

  goBack(e) {
    this.buttons = this.generalButtons;
    this.tabChanged('0');
  }

  addRequest(e) {
    let generalInfo = this.generalInfoForm.value;
    this.store.dispatch(addNewRequest({
      requestData: {
      areaOfInterest: generalInfo['areaOfInterest'][0],
      startDate: generalInfo['dateRange'][0],
      endDate: generalInfo['dateRange'][1],
      projectDescription: generalInfo['projectDescription'],
      note: generalInfo['notes'],
      resources: this.resources
    }}));
  }

  ngOnDestroy() {
    this.translationSub.unsubscribe();
  }
}
