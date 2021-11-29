import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'edit-image-dialog',
  templateUrl: './edit-image-dialog.component.html',
  styleUrls: ['./edit-image-dialog.component.scss'],
})
export class EditImageDialogComponent implements OnInit {
  selectedImage: any;
  croppedImage: any;
  constructor(
    private dialogRef: MatDialogRef<EditImageDialogComponent>,
    private toastrService: ToastrService,
    @Inject(MAT_DIALOG_DATA) private profileData: any
  ) {}

  ngOnInit() {
    this.selectedImage = this.profileData.selectedImage;
  }

  imageCropped(croppedImage: any) {
    this.croppedImage = croppedImage;
    console.log('image size', croppedImage);
  }

  imageLoaded() {
    console.log('Image Loaded');
  }

  loadImageFailed() {
    this.toastrService.error(
      'Failed To Load Image. Try again!',
      'Something went wrong'
    );
    this.dialogRef.close();
  }
}
