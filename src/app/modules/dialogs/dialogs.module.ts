import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionConfirmDialogComponent } from './action-confirm-dialog/action-confirm-dialog.component';
import { MaterialModule } from 'src/app/material.module';
import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditImageDialogComponent } from './edit-image-dialog/edit-image-dialog.component';

@NgModule({
  declarations: [ActionConfirmDialogComponent, AddCategoryDialogComponent, EditImageDialogComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [ActionConfirmDialogComponent, AddCategoryDialogComponent, EditImageDialogComponent],
})
export class DialogsModule {}
