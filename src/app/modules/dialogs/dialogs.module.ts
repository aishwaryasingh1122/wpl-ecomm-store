import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionConfirmDialogComponent } from './action-confirm-dialog/action-confirm-dialog.component';
import { MaterialModule } from 'src/app/material.module';
import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditImageDialogComponent } from './edit-image-dialog/edit-image-dialog.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { UpdateQuantityDialogComponent } from './update-quantity-dialog/update-quantity-dialog.component';
import { ManageAddressDialogComponent } from './manage-address-dialog/manage-address-dialog.component';

@NgModule({
  declarations: [
    ActionConfirmDialogComponent,
    AddCategoryDialogComponent,
    EditImageDialogComponent,
    UpdateQuantityDialogComponent,
    ManageAddressDialogComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
  ],
  exports: [
    ActionConfirmDialogComponent,
    AddCategoryDialogComponent,
    EditImageDialogComponent,
    UpdateQuantityDialogComponent,
    ManageAddressDialogComponent,
  ],
})
export class DialogsModule {}
