import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForm } from '@angular/forms';
import { switchMap } from 'rxjs/operators';

import { ImageRequestService } from '../../services/image-request.service';
import { HelpersService } from '../../imports';

import { ImageAddComponent } from '../../dialogs/image-add/image-add.component';

import Cropper from 'cropperjs';
import swal from 'sweetalert2';
import { ImageService } from '../../services/image.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.sass']
})
export class ImageEditComponent implements OnInit, OnDestroy {
  image: any;

  API_URL: string;

  IMAGE_URL: string;

  cropper: any;

  cropperInitialized = false;

  cropperData: any = { x: null, y: null, width: null, height: null, rotate: null };

  subs = new Subscription;

  get isPageReady() {
    return !!this.image;
  }

  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private requestService: ImageRequestService,
    private service: ImageService,
    private helpersService: HelpersService,
  ) {
    this.API_URL = this.requestService.makeUrl('image');

    this.IMAGE_URL = this.requestService.makeUrl('storage.images');
  }

  ngOnInit() {
    this.subs.add(
      this.route.params.pipe(switchMap((params: Params) => this.requestService.getEdit(params['image'])))
        .subscribe(response => {
          this.image = response;
        })
    );
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
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

    const element = <HTMLImageElement>document.getElementById(id);

    this.cropper = new Cropper(element, {
      scalable: false,
      zoomable: false,
      ready: () => this.cropperInitialized = true,
      crop: (e: any) => {
        for (const key in this.cropperData) {
          if (this.cropperData.hasOwnProperty(key)) {
            this.cropperData[key] = e.detail[key].toFixed(0);
          }
        }
      }
    });
  }

  setData(data: any) {
    this.cropper.setData(data);
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

    this.subs.add(
      this.requestService.putImage(this.image.u_id, data).subscribe(response => {
        this.snackBar.open(response.message, response.action, {
          duration: 2000
        });

        this.reloadView();
      })
    )
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
    this.service.deleteAlert('Fotoğrafı Sil', () => {
      this.subs.add(
        this.requestService.deleteImage(this.image.u_id)
          .subscribe(response => this.helpersService.navigate(['images']))
      );
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
