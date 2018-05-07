import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { NgForm } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

import { ImageRequestService } from '../../services/image-request.service';
import { HelpersService } from '../../imports';

import { ImageSaveAsComponent } from '../../dialogs/image-save-as/image-save-as.component';

declare var Cropper: any;

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.sass']
})
export class ImageEditComponent implements OnInit {
  image: any;

  u_id: any;

  API_URL: string;

  IMAGE_URL: string;

  cropper: any;

  cropperInitialized = false;

  cropperData: any = {x: null, y: null, width: null, height: null, rotate: null};

  get isPageReady()
  {
    return !!this.image && this.u_id;
  }

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private imageRequestService: ImageRequestService,
    private helpersService: HelpersService,
  ) {
    this.API_URL = this.imageRequestService.makeUrl('image');

    this.IMAGE_URL = this.imageRequestService.makeUrl('image.image');
   }

  ngOnInit() {
    this.route.params.pipe(switchMap( (params: Params) => this.imageRequestService.getEdit(params['image'])))
                      .subscribe(response => {
                        this.u_id = response.u_id;
                        this.image = response;
                      });
  }

  getToken()
  {
    return this.helpersService.getToken()
  }

  initialCropper(id: string)
  {
    if (this.cropper) {
      this.cropper.destroy();
      this.cropper = null;
      this.cropperInitialized = false;
      return;
    }

    const element = document.getElementById(id);

    this.cropper = new Cropper(element, {
      scalable: false,
      zoomable: false,
      ready: () => this.cropperInitialized = true,
      crop: (e: any) => {
        this.cropperData.x = parseInt(e.detail.x);
        this.cropperData.y = parseInt(e.detail.y);
        this.cropperData.width = parseInt(e.detail.width);
        this.cropperData.height = parseInt(e.detail.height);
        this.cropperData.rotate = parseInt(e.detail.rotate);
      }
    });
  }

  setData(f: NgForm)
  {
    this.cropper.setData({
      x: parseInt(f.value.x),
      y: parseInt(f.value.y),
      width: parseInt(f.value.width),
      height: parseInt(f.value.height),
      rotate: parseInt(f.value.rotate),
    })
  }
  //
  // consoleLog()
  // {
  //   console.log(this.cropper.getData())
  // }

  saveAndUpdateImage(f: NgForm, save: boolean)
  {
    let data = {};

    const _public = f.value.public ? 1 : 0;

    const save_as = (save) ? 1 : 0;

    if (this.cropper) {
      const cropper = this.cropper.getData();

      data = {
        u_id: this.u_id,
        name: f.value.name,
        alt: f.value.alt,
        save_as: save_as,
        crop: 1,
        public: _public,
        width: parseInt(cropper.width),
        height: parseInt(cropper.height),
        x: parseInt(cropper.x),
        y: parseInt(cropper.y),
        rotate: parseInt(cropper.rotate)
      };
    } else {
      data = {
        u_id: this.u_id,
        name: f.value.name,
        alt: f.value.alt,
        save_as: save_as,
        crop: 0,
        public: _public
      };
    }

    let rq1 = this.imageRequestService.putEdit(data).subscribe(response => {
      rq1.unsubscribe();
      rq1 = null;
    });
  }

  deleteImage()
  {
    let rq2 = this.imageRequestService.deleteImage(this.u_id).subscribe(response => {

      this.helpersService.navigate(['images']);

      rq2.unsubscribe();
      rq2 = null;
    });
  }

  calcSize(size: number)
  {
    return (size / 1024).toFixed(1);
  }

  openSaveAs()
  {
    const dialogRef = this.dialog.open(ImageSaveAsComponent, {
      disableClose: true
    });

    let rq3 = dialogRef.afterClosed().subscribe( result => {
      if (!result) return;

      this.saveAndUpdateImage(result, true),

      rq3.unsubscribe();
      rq3 = null;
    });
  }

}
