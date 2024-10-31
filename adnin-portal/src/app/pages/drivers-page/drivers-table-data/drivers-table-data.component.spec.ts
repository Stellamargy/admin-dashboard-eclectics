import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversTableDataComponent } from './drivers-table-data.component';

describe('DriversTableDataComponent', () => {
  let component: DriversTableDataComponent;
  let fixture: ComponentFixture<DriversTableDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriversTableDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversTableDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
