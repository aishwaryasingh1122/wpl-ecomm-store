import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  passwordVisible = false;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  showLoader = false;

  constructor(
    private toastrService: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}

  login() {
    this.showLoader = true;
    this.userService.login(this.loginForm.value).subscribe({
      next: (res: Boolean) => {
        this.showLoader = false;
        if (res) {
          this.toastrService.success(
            'Welcome to E-Comm Store',
            'Login Successful!'
          );
        }
      },
      error: (err) => {
        this.showLoader = false;
        this.toastrService.error(err, 'Login Failed');
      },
    });
  }
}
