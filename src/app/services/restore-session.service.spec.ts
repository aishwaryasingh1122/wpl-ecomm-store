import { TestBed } from '@angular/core/testing';

import { RestoreSessionService } from './restore-session.service';

describe('RestoreSessionService', () => {
  let service: RestoreSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestoreSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
