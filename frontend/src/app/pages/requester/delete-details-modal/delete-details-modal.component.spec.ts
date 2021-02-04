import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteDetailsModalComponent } from './delete-details-modal.component';

describe('DeleteDetailsModalComponent', () => {
  let component: DeleteDetailsModalComponent;
  let fixture: ComponentFixture<DeleteDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteDetailsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
