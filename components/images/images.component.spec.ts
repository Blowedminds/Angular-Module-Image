import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagesComponent } from './images.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TestingHelper, NavigationModule } from '../../imports';
import { ImageRequestService } from '../../services/image-request.service';
import { ImageService } from '../../services/image.service';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ImagesComponent', () => {
  let component: ImagesComponent;
  let fixture: ComponentFixture<ImagesComponent>;

  const testingHelper = new TestingHelper();

  const imageRequestServiceStub = {
    getImages: () => of([]),
    makeUrl: () => ''
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImagesComponent],
      providers: [
        { provide: ImageRequestService, useValue: imageRequestServiceStub },
        ImageService
      ],
      imports: [
        NoopAnimationsModule,
        NavigationModule,
        RouterTestingModule.withRoutes(testingHelper.routes)
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
