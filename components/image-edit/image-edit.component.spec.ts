import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageEditComponent } from './image-edit.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TestingHelper, NavigationModule } from '../../imports';
import { ImageRequestService } from '../../services/image-request.service';
import { ImageService } from '../../services/image.service';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ImageEditComponent', () => {
  let component: ImageEditComponent;
  let fixture: ComponentFixture<ImageEditComponent>;

  const testingHelper = new TestingHelper();

  const imageRequestServiceStub = {
    getEdit: () => of({}),
    makeUrl: () => ''
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ImageEditComponent],
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
    fixture = TestBed.createComponent(ImageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
