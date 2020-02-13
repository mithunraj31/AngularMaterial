import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnfulfillConfirmationComponent } from './unfulfill-confirmation.component';

describe('UnfulfillConfirmationComponent', () => {
  let component: UnfulfillConfirmationComponent;
  let fixture: ComponentFixture<UnfulfillConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnfulfillConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnfulfillConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
