import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ImageAddComponent } from '../../dialogs/image-add/image-add.component';

import { ImageRequestService } from '../../services/image-request.service';

import { HelpersService } from '../../imports';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.sass']
})
export class ImagesComponent implements OnInit, OnDestroy {

  images: any;

  THUMB_IMAGE_URL: string;

  subs = new Subscription();

  get isPageReady() {
    return !!this.images;
  }

  constructor(
    public dialog: MatDialog,
    private imageRequestService: ImageRequestService,
    private helpersService: HelpersService
  ) {
    this.THUMB_IMAGE_URL = this.imageRequestService.makeUrl('storage.images.thumbs');
  }

  ngOnInit() {
    this.subs.add(
      this.imageRequestService.getImages().subscribe(response => {
        this.images = response.reduce((result: any, image: any) => {
          const key = image.public ? 'public' : 'private';
          result[key].push(image);
          return result;
        }, { public: [], private: [] });
      })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  makeImageUrl(image_id: string) {
    return this.THUMB_IMAGE_URL + image_id + '?token=' + this.helpersService.getToken();
  }

  openImageUploader() {
    const dialogRef = this.dialog.open(ImageAddComponent, {
      disableClose: true
    });

    this.subs.add(
      dialogRef.afterClosed().subscribe(result => {
        if (!result) {
          return;
        }

        this.images = null;

        this.subs.add(
          this.imageRequestService.getImages().subscribe(response => this.images = response)
        );
      })
    )
  }
}
