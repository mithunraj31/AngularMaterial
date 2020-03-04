import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductForecastComponent } from './product-forecast.component';

describe('ProductForecastComponent', () => {
  let component: ProductForecastComponent;
  let fixture: ComponentFixture<ProductForecastComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductForecastComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
