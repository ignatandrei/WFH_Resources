import { TestBed } from '@angular/core/testing';

import { LoadDataService } from './load-data.service';

describe('LoadDataService', () => {
  let service: LoadDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoadDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
