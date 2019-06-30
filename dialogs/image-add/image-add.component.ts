import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { HttpEventType } from '@angular/common/http';

import { ImageRequestService } from '../../services/image-request.service';

@Component({
  selector: 'app-image-add',
  templateUrl: './image-add.component.html',
  styleUrls: ['./image-add.component.sass']
})
export class ImageAddComponent implements OnInit, AfterViewInit {

  imageBlob: Blob;

  length = 0;

  uploading = false;

  @ViewChild('file', { static: true }) file: ElementRef;

  constructor(
    private imageRequestService: ImageRequestService,
    public dialogRef: MatDialogRef<ImageAddComponent>,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.data) {

      this.imageBlob = this.data.imageBlob;

      const reader = new FileReader();

      reader.onload = function (e: any) {
        document.getElementById('image').setAttribute('src', e.target.result);
      };

      reader.readAsDataURL(this.imageBlob);
    } else {

      this.file.nativeElement.click();
    }
  }

  showImage(img: string) {
    const reader = new FileReader();

    const input = this.file.nativeElement;

    const item = document.getElementById(img);

    item.setAttribute('src', '');

    reader.onload = function (e: any) {

      item.setAttribute('src', e.target.result);
    };

    reader.readAsDataURL(input.files.item(0));
  }

  uploadImage(f: NgForm) {

    const rq1 = this.imageRequestService.putImage({
      name: f.value.name,
      public: f.value.public ? 1 : 0,
      alt: f.value.alt
    }, this.imageBlob || this.file.nativeElement.files.item(0)
    ).subscribe((response: any) => {
      console.log(response, 0);
      console.log(response.type === HttpEventType.UploadProgress, HttpEventType.UploadProgress, response.type, 0.2);

      this.uploading = true;

      if (response.type === HttpEventType.UploadProgress) {
        // This is an upload progress response. Compute and show the % done:
        const percentDone = Math.round(100 * response.loaded / response.total);
        console.log(response, 1);
        this.length = percentDone;
      } else if (response.type === HttpEventType.Response) {
        console.log(response, 2);

        this.dialogRef.close(response.body.data.u_id);

        this.snackBar.open(response.body.message, response.body.action, {
          duration: 2000
        });

        rq1.unsubscribe();
      }

      console.log(response, 3);
    });
  }
}
