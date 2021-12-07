import { TestBed } from '@angular/core/testing';

import { ProductDetailsGuardService } from './product-details-guard.service';

describe('ProductDetailsGuardService', () => {
  let service: ProductDetailsGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDetailsGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
