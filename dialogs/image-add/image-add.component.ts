import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';

import { HttpEventType, HttpResponse, HttpRequest } from '@angular/common/http';

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

  @ViewChild('file') file: ElementRef;

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
    ).subscribe(response => {

      this.uploading = true;

      if (response.type === HttpEventType.UploadProgress) {
        // This is an upload progress response. Compute and show the % done:
        const percentDone = Math.round(100 * response.loaded / response.total);

        this.length = percentDone;
      } else if (response instanceof HttpResponse) {
        this.dialogRef.close(response.body.data.u_id);

        this.snackBar.open(response.body.message, response.body.action, {
          duration: 2000
        });

        rq1.unsubscribe();
      }
    });
  }
}
