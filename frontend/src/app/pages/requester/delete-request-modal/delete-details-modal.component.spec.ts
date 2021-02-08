import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteRequestModalComponent } from './delete-request-modal.component';

describe('DeleteDetailsModalComponent', () => {
  let component: DeleteRequestModalComponent;
  let fixture: ComponentFixture<DeleteRequestModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteRequestModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
