import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.scss'],
})
export class AddCategoryDialogComponent implements OnInit {
  newCategoryForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
  });

  constructor() {}

  ngOnInit(): void {}
}
