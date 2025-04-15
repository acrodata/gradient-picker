import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradientPickerComponent } from './gradient-picker.component';

describe('GradientPickerComponent', () => {
  let component: GradientPickerComponent;
  let fixture: ComponentFixture<GradientPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GradientPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GradientPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
