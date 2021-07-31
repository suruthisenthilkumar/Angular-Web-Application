import { TestBed } from '@angular/core/testing';

import { ClientDetailsService } from './client-details.service';

describe('ClientDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClientDetailsService = TestBed.get(ClientDetailsService);
    expect(service).toBeTruthy();
  });
});
