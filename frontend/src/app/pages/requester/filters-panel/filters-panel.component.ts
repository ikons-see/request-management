import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { RequestFilters } from '../../../types/request-types';
import { ApplicationState } from '../../../app.module';
import { AreaOfInterest, RequestStatus, Seniority, Skills } from '../../../types/data-types';

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
  areas = Object.values(AreaOfInterest);
  seniorities = Object.values(Seniority);
  skills = Object.values(Skills);
  statuses = Object.values(RequestStatus);
  formGroupSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
    private store: Store<ApplicationState>) {

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
