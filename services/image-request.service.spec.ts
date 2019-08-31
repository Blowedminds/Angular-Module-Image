import { TestBed, inject, async } from '@angular/core/testing';

import { ImageRequestService } from './image-request.service';
import { TestingHelper, CoreModule } from '../imports';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { catchError } from 'rxjs/operators';

describe('ImageRequestService', () => {

  let requestService: ImageRequestService;

  const testingHelper = new TestingHelper();
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageRequestService],
      imports: [
        CoreModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(testingHelper.routes)
      ]
    });

    requestService = TestBed.get(ImageRequestService);
  });

  it('should be created', inject([ImageRequestService], (service: ImageRequestService) => {
    expect(service).toBeTruthy();
  }));

  it('should have correct route for postImage', async(() => {
    requestService.postImage({}, {})
      .pipe(catchError(error => testingHelper.unAuthenticatedError(error)))
      .subscribe(response => response, error => error);
  }));

  it('should have correct route for getImages', async(() => {
    requestService.getImages()
      .pipe(catchError(error => testingHelper.unAuthenticatedError(error)))
      .subscribe(response => response, error => error);
  }));

  it('should have correct route for getEdit', async(() => {
    requestService.getEdit('image')
      .pipe(catchError(error => testingHelper.unAuthenticatedError(error)))
      .subscribe(response => response, error => error);
  }));

  it('should have correct route for setAppliedFormRead', async(() => {
    requestService.putImage('image', {})
      .pipe(catchError(error => testingHelper.unAuthenticatedError(error)))
      .subscribe(response => response, error => error);
  }));

  it('should have correct route for deleteImage', async(() => {
    requestService.deleteImage('image')
      .pipe(catchError(error => testingHelper.unAuthenticatedError(error)))
      .subscribe(response => response, error => error);
  }));
});
