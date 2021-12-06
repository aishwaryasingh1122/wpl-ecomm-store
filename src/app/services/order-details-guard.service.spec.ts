import { TestBed } from '@angular/core/testing';

import { OrderDetailsGuardService } from './order-details-guard.service';

describe('OrderDetailsGuardService', () => {
  let service: OrderDetailsGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderDetailsGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
