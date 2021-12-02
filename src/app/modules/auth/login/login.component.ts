import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  passwordVisible = false;
  redirectUrl: string = '';
  routeSubscription?: Subscription;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  showLoader = false;

  constructor(
    private toastrService: ToastrService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.queryParams.subscribe((params: any) => {
      if (params && params.redirect) {
        this.redirectUrl = params.redirect;
      }
    });
  }

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

          this.router.navigate([this.redirectUrl || '/products']);
        }
      },
      error: (err) => {
        this.showLoader = false;
        if (err.status == 400) {
          this.toastrService.error(err, 'Login Failed');
        } else {
          this.toastrService.error(err.error.msg, 'Login Failed');
        }
      },
    });
  }
}
