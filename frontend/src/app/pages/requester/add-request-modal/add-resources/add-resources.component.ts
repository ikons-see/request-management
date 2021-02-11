import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Seniority, Skills } from 'src/app/types/data-types';
import { Resource } from 'src/app/types/request-types';

@Component({
  selector: 'app-add-resources',
  templateUrl: './add-resources.component.html',
  styleUrls: ['./add-resources.component.scss']
})
export class AddResourcesComponent implements OnInit {

  @Input()
  formGroup: FormGroup;

  @Input()
  resources: Array<Resource>;
  
  seniorities = Object.values(Seniority);
  skills = Object.values(Skills);
  isCollapsed: Array<boolean> = [];
  submittedForm: boolean = false;
  infoText: boolean = false;

  constructor(private formBuilder: FormBuilder) { 
  }

  ngOnInit(): void {
    if(this.resources.length > 0) {
      this.isCollapsed = new Array(this.resources.length).fill(true);
    }
    this.formGroup.get('skills').valueChanges
    .subscribe(value => {
      if(value.includes(Skills.Other)) {
        this.formGroup.controls['note'].setValidators([Validators.required]);
        this.infoText = true;
      } else {
        this.formGroup.controls['note'].clearValidators();
        this.infoText = false;
      }
      this.formGroup.controls['note'].updateValueAndValidity();
    });
  }

  validateSkills() {
    if(this.formGroup.get('skills').value.length == 0 ) {
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
    if(this.formGroup.valid) {
      this.isCollapsed.push(true);
      this.resources.push(value);
    }
  }

  removeResource(index: number) {
    this.resources.splice(index, 1);
    this.isCollapsed.splice(index, 1);
  }
}
