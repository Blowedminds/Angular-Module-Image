import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ImagesComponent } from './components/images/images.component';
import { ImageEditComponent } from './components/image-edit/image-edit.component';
import { NavigationComponent } from './imports';

const routes: Routes = [
  {
    path: '', component: NavigationComponent, children: [
      { path: 'images', component: ImagesComponent },
      { path: 'image/:image', component: ImageEditComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      {
        enableTracing: false
      }
    )],
  exports: [
    RouterModule
  ]
})
export class ImageRoutingModule { }
