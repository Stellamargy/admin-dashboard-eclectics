import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleTypesandPricesComponent } from './vehicle-typesand-prices.component';

describe('VehicleTypesandPricesComponent', () => {
  let component: VehicleTypesandPricesComponent;
  let fixture: ComponentFixture<VehicleTypesandPricesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleTypesandPricesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleTypesandPricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
