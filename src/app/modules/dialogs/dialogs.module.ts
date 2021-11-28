import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionConfirmDialogComponent } from './action-confirm-dialog/action-confirm-dialog.component';
import { MaterialModule } from 'src/app/material.module';
import { AddCategoryDialogComponent } from './add-category-dialog/add-category-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ActionConfirmDialogComponent, AddCategoryDialogComponent],
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule],
  exports: [ActionConfirmDialogComponent, AddCategoryDialogComponent],
})
export class DialogsModule {}
