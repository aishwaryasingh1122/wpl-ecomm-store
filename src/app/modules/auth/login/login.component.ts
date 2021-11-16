import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private toastrService: ToastrService) {}

  ngOnInit(): void {}

  login() {
    this.toastrService.success('Success Message', 'Toast Title');
    this.toastrService.info('Info Message', 'Toast Title');
    this.toastrService.warning('Warning Message', 'Toast Title');
    this.toastrService.error('Error Message', 'Toast Title');
  }
}
