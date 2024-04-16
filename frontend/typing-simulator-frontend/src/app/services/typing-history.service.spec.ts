import { TestBed } from '@angular/core/testing';

import { TypingHistoryService } from './typing-history.service';

describe('TypingHistoryService', () => {
  let service: TypingHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypingHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
