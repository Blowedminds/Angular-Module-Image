import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImageRoutingModule } from './image-routing.module';

import { ImagesComponent } from './components/images/images.component';
import { ImageEditComponent } from './components/image-edit/image-edit.component';
import { ImageAddComponent } from './dialogs/image-add/image-add.component';

import { ImageRequestService } from './services/image-request.service';
import { ImageService } from './services/image.service';
import { NavigationModule } from '../navigation/navigation.module';

@NgModule({
  declarations: [
    ImagesComponent,
    ImageEditComponent,
    ImageAddComponent
  ],
  imports: [
    CommonModule,
    ImageRoutingModule,
    NavigationModule
  ],
  providers: [
    ImageRequestService,
    ImageService
  ],
  entryComponents: [
    ImageAddComponent
  ]
})
export class ImageModule { }
