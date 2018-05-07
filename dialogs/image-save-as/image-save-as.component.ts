import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'

import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-image-save-as',
  templateUrl: './image-save-as.component.html',
  styleUrls: ['./image-save-as.component.sass']
})
export class ImageSaveAsComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ImageSaveAsComponent>,
  ) { }

  ngOnInit() {
  }

  updateImage(f: NgForm)
  {
    this.dialogRef.close(f)
  }

}
