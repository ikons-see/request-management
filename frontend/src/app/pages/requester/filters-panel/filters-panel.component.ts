import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { RequestFilters } from '../../../types/request-types';
import { ApplicationState } from '../../../app.module';
import { AreaOfInterest, RequestStatus, Seniority, Skills } from '../../../types/data-types';
import {getAreaOfInterests, getSkills} from "../../../store/requests/requests-reducer";

@Component({
  selector: 'app-filters-panel',
  templateUrl: './filters-panel.component.html',
  styleUrls: ['./filters-panel.component.scss']
})
export class FiltersPanelComponent implements OnInit, OnChanges {

  @Input()
  filters: RequestFilters;

  @Output()
  addFilters = new EventEmitter<RequestFilters>();

  @Output()
  removeFilters = new EventEmitter();

  formGroup: FormGroup;
  areas = [];
  seniorities = Object.values(Seniority);
  skills = [];
  statuses = Object.values(RequestStatus);
  formGroupSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
    private store: Store<ApplicationState>) {

    this.store.select(getAreaOfInterests).subscribe(areas => this.areas = areas);
    this.store.select(getSkills).subscribe(skills => this.skills = skills);

    this.formGroup = this.formBuilder.group({
      statuses: [''],
      areaOfInterest: [''],
      startDate: [''],
      endDate: [''],
      total: [''],
      seniority: [''],
      skills: ['']
    });
  }

  ngOnInit(): void {
    this.formGroup.patchValue({...this.filters});
  }

  ngOnChanges() {
    this.formGroup.patchValue({...this.filters});
  }

  applyFilters() {
    this.addFilters.emit(this.formGroup.value);
  }

  resetFilters() {
    this.removeFilters.emit();
  }

}
