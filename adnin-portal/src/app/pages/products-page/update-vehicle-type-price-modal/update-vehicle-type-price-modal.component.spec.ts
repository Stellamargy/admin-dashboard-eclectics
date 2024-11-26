import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateVehicleTypePriceModalComponent } from './update-vehicle-type-price-modal.component';

describe('UpdateVehicleTypePriceModalComponent', () => {
  let component: UpdateVehicleTypePriceModalComponent;
  let fixture: ComponentFixture<UpdateVehicleTypePriceModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateVehicleTypePriceModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateVehicleTypePriceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
