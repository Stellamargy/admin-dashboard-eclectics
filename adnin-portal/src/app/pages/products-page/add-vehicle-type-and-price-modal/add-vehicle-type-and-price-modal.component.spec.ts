import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVehicleTypeAndPriceModalComponent } from './add-vehicle-type-and-price-modal.component';

describe('AddVehicleTypeAndPriceModalComponent', () => {
  let component: AddVehicleTypeAndPriceModalComponent;
  let fixture: ComponentFixture<AddVehicleTypeAndPriceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVehicleTypeAndPriceModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVehicleTypeAndPriceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
