import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSetsComponent } from './product-sets.component';

describe('ProductSetsComponent', () => {
  let component: ProductSetsComponent;
  let fixture: ComponentFixture<ProductSetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductSetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
