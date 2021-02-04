import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestResourcesComponent } from './request-resources.component';

describe('RequestResourcesComponent', () => {
  let component: RequestResourcesComponent;
  let fixture: ComponentFixture<RequestResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
