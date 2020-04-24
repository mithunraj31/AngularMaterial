import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrivedShipmentsComponent } from './arrived-shipments.component';

describe('ArrivedShipmentsComponent', () => {
  let component: ArrivedShipmentsComponent;
  let fixture: ComponentFixture<ArrivedShipmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrivedShipmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrivedShipmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
