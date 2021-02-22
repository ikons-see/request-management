import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResourceModalComponent } from './edit-resource-modal.component';

describe('EditResourceModalComponent', () => {
  let component: EditResourceModalComponent;
  let fixture: ComponentFixture<EditResourceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditResourceModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditResourceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
