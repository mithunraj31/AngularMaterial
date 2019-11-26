import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomingShipmentsComponent } from './incoming-shipments.component';

describe('IncomingShipmentsComponent', () => {
  let component: IncomingShipmentsComponent;
  let fixture: ComponentFixture<IncomingShipmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomingShipmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomingShipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
