import { NgModule } from '@angular/core';
import { RouterModule, Routes }    from '@angular/router';

import { NavigationComponent } from './components/navigation/navigation.component';
import { ImagesComponent } from './components/images/images.component';
import { ImageEditComponent } from './components/image-edit/image-edit.component';

const routes = [
  { path: "", component: NavigationComponent, children: [
      { path: "images", component: ImagesComponent },
      { path: "image/:image", component: ImageEditComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes,
      { enableTracing: false}
  )],
  exports: [
    RouterModule
  ]
})
export class ImageRoutingModule { }
