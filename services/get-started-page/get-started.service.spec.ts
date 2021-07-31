import { TestBed } from '@angular/core/testing';

import { GetStartedService } from './get-started.service';

describe('GetStartedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetStartedService = TestBed.get(GetStartedService);
    expect(service).toBeTruthy();
  });
});
