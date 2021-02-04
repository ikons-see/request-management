import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ApplicationState } from 'src/app/app.module';
import { addNewRequest } from 'src/app/store/requests-actions';
import { AreaOfInterest, ButtonConfiguration, ButtonType, Tab } from 'src/app/types/data-types';
import { Resource } from 'src/app/types/request-types';
import { AddGeneralInfoComponent } from './add-general-info/add-general-info.component';

@Component({
  selector: 'app-add-request-modal',
  templateUrl: './add-request-modal.component.html',
  styleUrls: ['./add-request-modal.component.scss']
})
export class AddRequestModalComponent implements OnInit {

  @Input()
  title: string;

  @ViewChild('general') childComponent: AddGeneralInfoComponent;

  buttons: Array<ButtonConfiguration>;
  tabs: Array<Tab>;
  activeId: string = '0';
  generalInfoForm: FormGroup;
  resourcesForm: FormGroup;
  resources: Array<Resource> = [];

  constructor(private formBuilder: FormBuilder,
    private store: Store<ApplicationState>) {
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

    this.initButtons();
    this.initTabs();
  }

  ngOnInit(): void {
  }

  initButtons() {
    this.buttons = [
      {
        text: "Next",
        type: ButtonType.DARK,
        disabled: this.generalInfoForm.invalid,
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
    this.childComponent.onSubmit();
    if(this.generalInfoForm.valid) {
      this.tabChanged('1');
      this.buttons = [
        {
          text: "Back",
          type: ButtonType.SECONDARY,
          onClick: (e) => this.goBack(e)
        },
        {
          text: "Add Request",
          type: ButtonType.DARK,
          onClick: (e) => this.addRequest(e)
        }
      ];
    }
  }

  goBack(e) {
    this.initButtons();
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
}
