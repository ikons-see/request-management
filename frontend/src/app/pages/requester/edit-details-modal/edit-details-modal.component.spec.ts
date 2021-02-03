import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDetailsModalComponent } from './edit-details-modal.component';

describe('EditDetailsModalComponent', () => {
  let component: EditDetailsModalComponent;
  let fixture: ComponentFixture<EditDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDetailsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
