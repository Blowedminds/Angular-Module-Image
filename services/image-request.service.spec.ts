import { TestBed, inject } from '@angular/core/testing';

import { ImageRequestService } from './image-request.service';

describe('ImageRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageRequestService]
    });
  });

  it('should be created', inject([ImageRequestService], (service: ImageRequestService) => {
    expect(service).toBeTruthy();
  }));
});
