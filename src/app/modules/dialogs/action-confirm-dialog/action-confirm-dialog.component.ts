import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'action-confirm-dialog',
  templateUrl: './action-confirm-dialog.component.html',
  styleUrls: ['./action-confirm-dialog.component.scss'],
})
export class ActionConfirmDialogComponent implements OnInit {
  title: string = 'Confirm Action';
  icon: string = '../../../../assets/img/warning.svg';
  messageLine1: string = 'Are you sure you want to continue ?';
  messageLine2: string = '';
  successText: string = 'Continue';
  cancelText: string = 'Cancel';

  constructor(
    private dialogRef: MatDialogRef<ActionConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private dialogData: any
  ) {}

  ngOnInit() {
    this.title = this.dialogData.title ?? this.title;
    this.icon = this.dialogData.icon ?? this.icon;
    this.messageLine1 = this.dialogData.messageLine1 ?? this.messageLine1;
    this.messageLine2 = this.dialogData.messageLine2 ?? this.messageLine2;
    this.successText = this.dialogData.successText ?? this.successText;
    this.cancelText = this.dialogData.cancelText ?? this.cancelText;
  }
}
