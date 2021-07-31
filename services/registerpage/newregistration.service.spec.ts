import { TestBed } from '@angular/core/testing';

import { NewregistrationService } from './newregistration.service';

describe('NewregistrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewregistrationService = TestBed.get(NewregistrationService);
    expect(service).toBeTruthy();
  });
});
