import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { ApplicationState } from '../../../app.module';
import { updateRequest } from '../../../store/requests/requests-actions';
import { getRequestById } from '../../../store/requests/requests-reducer';
import { ButtonConfiguration, ButtonType, Tab } from '../../../types/data-types';
import { RequestDetails, Resource } from '../../../types/request-types';
import { EditGeneralInfoComponent } from './edit-general-info/edit-general-info.component';
import { EditResourcesComponent } from './edit-resources/edit-resources.component';

@Component({
  selector: 'app-edit-details-modal',
  templateUrl: './edit-details-modal.component.html',
  styleUrls: ['./edit-details-modal.component.scss']
})
export class EditDetailsModalComponent implements OnInit, OnDestroy {

  @Input()
  title: string;

  @Input()
  requestId: number;

  @ViewChild('general') generalCmp: EditGeneralInfoComponent;
  @ViewChild('resources') resourcesCmp: EditResourcesComponent;

  generalInfoForm: FormGroup;
  resourcesForm: FormGroup;
  request: RequestDetails;
  requestRsc: Array<Resource>;
  buttons: Array<ButtonConfiguration>;
  generalButtons: Array<ButtonConfiguration>;
  resourcesButtons: Array<ButtonConfiguration>;
  tabs: Array<Tab>;
  activeId: string = '0';
  requestSubscribtion: Subscription;
  translationSub: Subscription;

  constructor(private formBuilder: FormBuilder,
              private store: Store<ApplicationState>,
              private translate: TranslateService) {
    this.initForms();
  }

  ngOnInit(): void {
    this.requestSubscribtion = this.store.select(getRequestById, this.requestId).subscribe(
      value => {
        this.request = value;
        if(value) {
          this.updateForms();
        }
      }
    );

    this.translationSub =  this.translate.get('edit-request').subscribe(translations => {
      this.init(translations);
     });
  }

  initForms() {
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

  init(translations: { [key: string]: string }) {
    this.generalButtons = [
      {
        text: translations['next'],
        type: ButtonType.DARK,
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
        text: translations['update-request'],
        type: ButtonType.DARK,
        onClick: (e) => this.updateRequest(e)
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

  resetButtons() {
    this.buttons = this.generalButtons;
  }

  updateForms() {
    this.generalInfoForm.patchValue({
      areaOfInterest: [this.request.areaOfInterest],
      dateRange: [new Date(this.request.startDate), new Date(this.request.endDate)],
      projectDescription: this.request.projectDescription,
      notes: this.request.notes
    });

    this.requestRsc = this.request.resources;
  }

  tabChanged(e) {
    this.activeId = e;
  }

  addResources() {
    this.generalCmp.onSubmit();
    if(this.generalInfoForm.valid) {
      this.tabChanged('1');
      this.buttons = this.resourcesButtons;
    }
  }

  goBack(e) {
    this.resetButtons();
    this.tabChanged('0');
  }

  updateRequest(e) {
    const values = this.generalInfoForm.value;
    let data = {
      requestId: this.request.requestId,
      areaOfInterest: values.areaOfInterest[0],
      startDate: values.dateRange[0],
      endDate: values.dateRange[1],
      projectDescription: values.projectDescription,
      notes: values.notes,
      newResources: this.resourcesCmp.getNewResources(),
      deletedResourceIds: this.resourcesCmp.getDeletedResources()
    }
    this.store.dispatch(updateRequest({request: data}));
  }

  ngOnDestroy() {
    this.translationSub.unsubscribe();
  }

}
