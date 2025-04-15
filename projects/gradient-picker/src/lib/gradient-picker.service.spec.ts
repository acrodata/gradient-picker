import { TestBed } from '@angular/core/testing';

import { GradientPickerService } from './gradient-picker.service';

describe('GradientPickerService', () => {
  let service: GradientPickerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradientPickerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
