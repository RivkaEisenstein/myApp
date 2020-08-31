import { TestBed } from '@angular/core/testing';

import { UserRideService } from './user-ride.service';

describe('UserRideService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserRideService = TestBed.get(UserRideService);
    expect(service).toBeTruthy();
  });
});
