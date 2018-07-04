import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NgForm } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

import { ImageRequestService } from '../../services/image-request.service';
import { HelpersService } from '../../imports';

import { ImageAddComponent } from '../../dialogs/image-add/image-add.component';

declare var Cropper: any;

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.sass']
})
export class ImageEditComponent implements OnInit {
  image: any;

  API_URL: string;

  IMAGE_URL: string;

  cropper: any;

  cropperInitialized = false;

  cropperData: any = { x: null, y: null, width: null, height: null, rotate: null };

  get isPageReady() {
    return !!this.image;
  }

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private imageRequestService: ImageRequestService,
    private helpersService: HelpersService,
  ) {
    this.API_URL = this.imageRequestService.makeUrl('image');

    this.IMAGE_URL = this.imageRequestService.makeUrl('image.image');
  }

  ngOnInit() {
    this.route.params.pipe(switchMap((params: Params) => this.imageRequestService.getEdit(params['image'])))
      .subscribe(response => {
        this.image = response;
      });
  }

  getToken() {
    return this.helpersService.getToken();
  }

  initialCropper(id: string) {
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

  setData(f: NgForm) {
    this.cropper.setData({
      x: parseInt(f.value.x),
      y: parseInt(f.value.y),
      width: parseInt(f.value.width),
      height: parseInt(f.value.height),
      rotate: parseInt(f.value.rotate),
    });
  }

  postImage(f: NgForm) {
    let data = {};

    if (this.cropper) {
      const cropper = this.cropper.getData();

      data = {
        name: f.value.name,
        alt: f.value.alt,
        crop: 1,
        public: f.value.public,
        width: parseInt(cropper.width),
        height: parseInt(cropper.height),
        x: parseInt(cropper.x),
        y: parseInt(cropper.y),
        rotate: parseInt(cropper.rotate)
      };
    } else {
      data = {
        name: f.value.name,
        alt: f.value.alt,
        crop: 0,
        public: f.value.public
      };
    }

    const rq1 = this.imageRequestService.postImage(this.image.u_id, data).subscribe(response => {
      this.snackBar.open(response.message, response.action, {
        duration: 2000
      });

      this.reloadView();

      rq1.unsubscribe();
    });
  }

  putImage() {
    this.cropper.getCroppedCanvas().toBlob(blob => {

      const dialogRef = this.dialog.open(ImageAddComponent, {
        disableClose: true,
        data: {
          imageBlob: blob,
        }
      });

      const sub = dialogRef.afterClosed().subscribe((response) => {
        if (!response) {
          return;
        }

        this.reloadView();

        this.helpersService.navigate(['/image/' + response]);

        sub.unsubscribe();
      });
    }, `image/${this.image.type}`);
  }

  deleteImage() {
    const rq2 = this.imageRequestService.deleteImage(this.image.u_id).subscribe(response => {

      this.helpersService.navigate(['images']);

      rq2.unsubscribe();
    });
  }

  calcSize(size: number) {
    return (size / 1024).toFixed(1);
  }

  reloadView() {
    if (this.cropper) {

      document.getElementById('img')
        .setAttribute('src', this.cropper.getCroppedCanvas().toDataURL(`image/${this.image.type}`));

      this.cropper.destroy();
    }

    this.cropper = null;
    this.cropperInitialized = false;
  }
}
