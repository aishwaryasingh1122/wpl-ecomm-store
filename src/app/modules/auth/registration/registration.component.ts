import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  passwordMismatch = false;
  showLoader = false;

  registrationForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
      ),
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  registerUser() {
    if (
      this.registrationForm.value.password !==
      this.registrationForm.value.confirmPassword
    ) {
      this.passwordMismatch = true;
      return;
    }

    this.showLoader = true;
    this.userService.register(this.registrationForm.value).subscribe({
      next: (res: boolean) => {
        this.showLoader = false;
        if (res) {
          this.toastrService.success(
            'Check your email for a verification link.',
            'Registration Sucessful!'
          );
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        this.showLoader = false;
        this.toastrService.error(err, 'Registration Failed!');
      },
    });
  }
}
