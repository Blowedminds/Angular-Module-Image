import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSaveAsComponent } from './image-save-as.component';

describe('ImageSaveAsComponent', () => {
  let component: ImageSaveAsComponent;
  let fixture: ComponentFixture<ImageSaveAsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageSaveAsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSaveAsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
