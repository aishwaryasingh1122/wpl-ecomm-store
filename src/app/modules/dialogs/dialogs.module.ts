import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionConfirmDialogComponent } from './action-confirm-dialog/action-confirm-dialog.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [ActionConfirmDialogComponent],
  imports: [CommonModule, MaterialModule],
  exports: [ActionConfirmDialogComponent],
})
export class DialogsModule {}
