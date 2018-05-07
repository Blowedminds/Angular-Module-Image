import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms'

import { ImageAddComponent } from '../../dialogs/image-add/image-add.component';

import { ImageRequestService } from '../../services/image-request.service';

import { HelpersService } from '../../imports';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.sass']
})
export class ImagesComponent implements OnInit {

  images: any;

  THUMB_IMAGE_URL: string;

  get isPageReady()
  {
    return !!this.images;
  }

  constructor(
    public dialog: MatDialog,
    private imageRequestService: ImageRequestService,
    private helpersService: HelpersService
  )
  {
    this.THUMB_IMAGE_URL = this.imageRequestService.makeUrl('image.thumb');
  }

  ngOnInit() {

    this.imageRequestService.getImages().subscribe( response => this.images = response);
  }

  makeImageUrl(image_id: string)
  {
    return this.THUMB_IMAGE_URL + image_id +'?token=' + this.helpersService.getToken()
  }

  openImageUploader()
  {
    let dialogRef = this.dialog.open(ImageAddComponent, {
      disableClose: true
    })

    let rq2 = dialogRef.afterClosed().subscribe( result => {
      if(!result) return

      this.images = null

      let rq3 = this.imageRequestService.getImages().subscribe(response => {
        this.images = response
        rq3.unsubscribe()
        rq3 = null
      })

      rq2.unsubscribe()
      rq2 = null
    })
  }
}
