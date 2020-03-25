import { TestBed } from '@angular/core/testing';

import { NagivationTableControlService } from './nagivation-table-control.service';

describe('NagivationTableControlService', () => {
  let service: NagivationTableControlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NagivationTableControlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
