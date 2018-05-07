import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { ImageRoutingModule } from './image-routing.module';

import { ImagesComponent } from './components/images/images.component';
import { ImageEditComponent } from './components/image-edit/image-edit.component';
import { ImageAddComponent } from './dialogs/image-add/image-add.component';
import { ImageSaveAsComponent } from './dialogs/image-save-as/image-save-as.component';
import { NavigationComponent } from './components/navigation/navigation.component'

import { ImageRequestService } from './services/image-request.service'
import { ImageService } from './services/image.service';

@NgModule({
  declarations: [
    ImagesComponent,
    ImageEditComponent,
    ImageAddComponent,
    ImageSaveAsComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,
    ImageRoutingModule,
    SharedModule,
    CoreModule
  ],
  providers: [
    ImageRequestService,
    ImageService
  ],
  entryComponents: [
    ImageAddComponent,
    ImageSaveAsComponent
  ]
})
export class ImageModule { }
