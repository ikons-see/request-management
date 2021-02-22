import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { ApplicationState } from 'src/app/app.module';
import { updateResource } from 'src/app/store/requests/requests-actions';
import { getSkills } from 'src/app/store/requests/requests-reducer';
import { Resource } from 'src/app/types/request-types';
import { ButtonConfiguration, ButtonType, Seniority } from '../../../../../types/data-types';

@Component({
  selector: 'app-edit-resource-modal',
  templateUrl: './edit-resource-modal.component.html',
  styleUrls: ['./edit-resource-modal.component.scss']
})
export class EditResourceModalComponent implements OnInit {

  @Input()
  resource: Resource;

  @Input()
  index: number;

  buttons: Array<ButtonConfiguration>;
  translationSub: Subscription;
  formGroup: FormGroup;
  submittedForm: boolean = false;
  seniorities = Object.values(Seniority);
  skills = [];

  constructor(private formBuilder: FormBuilder,
    private translate: TranslateService,
    private store: Store<ApplicationState>,
    public bsModalRef: BsModalRef) {
    this.translationSub = this.translate.get('edit-request').subscribe(translations => {
      this.init(translations);
    });
    this.store.select(getSkills).subscribe(skills => this.skills = skills);
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      total: [this.resource.total, [Validators.required, Validators.min(1)]],
      seniority: [[this.resource.seniority], Validators.required],
      skills: [this.resource.skills],
      note: [this.resource.note]
    });
  }

  init(translations: { [key: string]: string }) {
    this.buttons = [
      {
        text: translations['update-resource'],
        type: ButtonType.DARK,
        onClick: (e) => this.onSubmit()
      }
    ]
  }

  total() {
    return this.formGroup.get('total');
  }

  note() {
    return this.formGroup.get('note');
  }

  seniority() {
    return this.formGroup.get('seniority');
  }

  validateSkills() {
    if (this.formGroup.get('skills').value.length == 0) {
      this.formGroup.controls['note'].setValidators([Validators.required]);
    } else {
      this.formGroup.controls['note'].clearValidators();
    }
    this.formGroup.controls['note'].updateValueAndValidity();
  }

  onSubmit() {
    this.submittedForm = true;
    this.validateSkills();
    let value = {
      ...this.formGroup.value,
      resourceId: this.resource.resourceId,
      seniority: this.formGroup.value['seniority'][0]
    };
    if(this.formGroup.valid) {
      this.store.dispatch(updateResource({resource: value, index: this.index}));
      this.bsModalRef.hide();
    }
  }

}
