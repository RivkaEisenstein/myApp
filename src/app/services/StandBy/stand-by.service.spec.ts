import { TestBed } from '@angular/core/testing';

import { StandByService } from './stand-by.service';

describe('StandByService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StandByService = TestBed.get(StandByService);
    expect(service).toBeTruthy();
  });
});
