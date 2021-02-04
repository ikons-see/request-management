import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGeneralInfoComponent } from './add-general-info.component';

describe('AddGeneralInfoComponent', () => {
  let component: AddGeneralInfoComponent;
  let fixture: ComponentFixture<AddGeneralInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGeneralInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
