import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Seniority, Skills } from 'src/app/types/data-types';
import { Resource } from 'src/app/types/request-types';
import { Store } from "@ngrx/store";
import { getSkills, getUpdatedResource } from "../../../../store/requests/requests-reducer";
import { openEditResourceModal } from 'src/app/store/requests/requests-actions';

@Component({
  selector: 'app-edit-resources',
  templateUrl: './edit-resources.component.html',
  styleUrls: ['./edit-resources.component.scss']
})
export class EditResourcesComponent implements OnInit {

  @Input()
  formGroup: FormGroup;

  @Input()
  resources: Array<Resource>;

  seniorities = Object.values(Seniority);
  skills = [];
  isCollapsed: Array<boolean> = [];
  submittedForm: boolean = false;
  currentResources: Array<Resource> = [];
  newResources: Array<Resource> = [];
  deletedResources: Array<number> = [];
  updatedResource: { resource: Resource, index: number };

  constructor(private store: Store) {
    this.store.select(getSkills).subscribe(skills => this.skills = skills);
    this.store.select(getUpdatedResource).subscribe(value => {
      this.updatedResource = value;
      if (value) {
        this.updateResource();
      }
    })
  }

  ngOnInit(): void {
    if (this.resources.length > 0) {
      this.isCollapsed = new Array(this.resources.length).fill(true);
      this.currentResources = [...this.resources];
    }
    this.formGroup.get('skills').valueChanges
      .subscribe(value => {
        this.formGroup.controls['note'].clearValidators();
        this.formGroup.controls['note'].updateValueAndValidity();
      });
  }

  validateSkills() {
    if (this.formGroup.get('skills').value.length == 0) {
      this.formGroup.controls['note'].setValidators([Validators.required]);
    } else {
      this.formGroup.controls['note'].clearValidators();
    }
    this.formGroup.controls['note'].updateValueAndValidity();
  }

  note() {
    return this.formGroup.get('note');
  }

  total() {
    return this.formGroup.get('total');
  }

  onSubmit() {
    this.submittedForm = true;
    this.validateSkills();
    let value = {
      ...this.formGroup.value,
      seniority: this.formGroup.value['seniority'][0]
    };
    if (this.formGroup.valid) {
      this.addResource(value);
    }
  }

  removeResource(index: number, item: Resource) {
    console.log('Item being removed:', item);
    this.isCollapsed.splice(index, 1);
    this.currentResources.splice(index, 1);
    if (item.resourceId) {
      this.deletedResources.push(item.resourceId);
    }
  }

  addResource(item: Resource) {
    this.isCollapsed.push(true);
    this.currentResources.push(item);
    this.newResources.push(item);
  }

  editResource(index: number, item: Resource) {
    console.log('Editing resource:', item);
    this.store.dispatch(openEditResourceModal({ resource: item, index: index }));
  }

  updateResource() {
    this.addResource(this.updatedResource.resource);
    this.removeResource(this.updatedResource.index, this.updatedResource.resource);
  }

  getCurrentResources() {
    return this.currentResources;
  }

  getNewResources() {
    return this.newResources;
  }

  getDeletedResources() {
    return this.deletedResources;
  }
}
