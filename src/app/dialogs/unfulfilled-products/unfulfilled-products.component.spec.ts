import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnfulfilledProductsComponent } from './unfulfilled-products.component';

describe('UnfulfilledProductsComponent', () => {
  let component: UnfulfilledProductsComponent;
  let fixture: ComponentFixture<UnfulfilledProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnfulfilledProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnfulfilledProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
