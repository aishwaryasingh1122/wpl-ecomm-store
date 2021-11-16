import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.scss'],
})
export class VerifyAccountComponent implements OnInit {
  showVerificationResults = false;
  verificationResult = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    const routeParams = this.route.snapshot.paramMap;
    const userId = routeParams.get('userId');

    if (userId) {
      this.userService.verifyAccount(userId).subscribe({
        next: (res: boolean) => {
          this.spinner.hide();
          this.showVerificationResults = true;
          this.verificationResult = res;
        },
        error: (err) => {
          this.spinner.hide();
          this.showVerificationResults = true;
          this.verificationResult = false;
        },
      });
    }
  }
}
