import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ApplicationState } from 'src/app/app.module';
import { updateRequest } from 'src/app/store/requests-actions';
import { getRequestById } from 'src/app/store/requests-reducer';
import { ButtonConfiguration, ButtonType, Tab } from 'src/app/types/data-types';
import { RequestDetails, Resource } from 'src/app/types/request-types';
import { EditGeneralInfoComponent } from './edit-general-info/edit-general-info.component';
import { EditResourcesComponent } from './edit-resources/edit-resources.component';

@Component({
  selector: 'app-edit-details-modal',
  templateUrl: './edit-details-modal.component.html',
  styleUrls: ['./edit-details-modal.component.scss']
})
export class EditDetailsModalComponent implements OnInit {

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
  tabs: Array<Tab>;
  activeId: string = '0';
  requestSubscribtion: Subscription;

  constructor(private formBuilder: FormBuilder,
              private store: Store<ApplicationState>) {
    this.initForms();
    this.initButtons();
    this.initTabs();
  }

  ngOnInit(): void {
    this.requestSubscribtion = this.store.select(getRequestById, this.requestId).subscribe(
      value => {
        this.request = value;
        this.updateForms();
      }
    );
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

  updateForms() {
    this.generalInfoForm.patchValue({
      areaOfInterest: [this.request.areaOfInterest],
      dateRange: [this.request.startDate, this.request.endDate],
      projectDescription: this.request.projectDescription,
      notes: this.request.note
    });

    this.requestRsc = this.request.resources;
  }

  initButtons() {
    this.buttons = [
      {
        text: "Next",
        type: ButtonType.DARK,
        onClick: (e) => this.addResources()
      }
    ]
  }

  initTabs() {
    this.tabs = [
      {
        id: '0',
        name: 'General Info',
        onClick: (e) => this.tabChanged(e)
      },
      {
        id: '1',
        name: 'Resources',
        onClick: (e) => this.tabChanged(e)
      }
    ]
  }

  tabChanged(e) {
    this.activeId = e;
  }

  addResources() {
    this.generalCmp.onSubmit();
    if(this.generalInfoForm.valid) {
      this.tabChanged('1');
      this.buttons = [
        {
          text: "Back",
          type: ButtonType.SECONDARY,
          onClick: (e) => this.goBack(e)
        },
        {
          text: "Update Request",
          type: ButtonType.DARK,
          onClick: (e) => this.updateRequest(e)
        }
      ];
    }
  }

  goBack(e) {
    this.initButtons();
    this.tabChanged('0');
  }

  updateRequest(e) {
    let data = {
      ...this.request,
      newResources: this.resourcesCmp.getNewResources(),
      deletedResources: this.resourcesCmp.getDeletedResources()
    }
    this.store.dispatch(updateRequest({request: data}));
  }

}
