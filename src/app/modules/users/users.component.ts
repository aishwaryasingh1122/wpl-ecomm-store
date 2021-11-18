import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { EMPTY, map, Observable, switchMap } from 'rxjs';
import { AssignUserRoleParams, User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { ActionConfirmDialogComponent } from '../dialogs/action-confirm-dialog/action-confirm-dialog.component';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  userList$: Observable<User[]>;
  showLoader = true;
  dialogRef: any = null;

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
    private dialog: MatDialog,
    private spinner: NgxSpinnerService
  ) {
    this.userList$ = this.userService.userList$;
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.showLoader = true;
    this.userService.findAllUsers().subscribe({
      next: (res: boolean) => {
        this.showLoader = false;
        if (!res) {
          this.toastrService.error(
            'Failed to fetch users. Try again!',
            'Something went wrong'
          );
        }
      },
      error: (err) => {
        this.showLoader = false;
        this.toastrService.error(err, 'Something went wrong');
      },
    });
  }

  assignUserRole(user: User, role: number) {
    this.dialogRef = this.dialog.open(ActionConfirmDialogComponent, {
      width: '550px',
      closeOnNavigation: true,
      data: {
        title: 'Confirm assign role',
        messageLine1: `Are you sure you want to update role for ${user.firstName} ${user.lastName} ?`,
        successText: 'Confirm',
      },
    });

    this.dialogRef
      .afterClosed()
      .pipe(
        switchMap((res) => {
          if (res) {
            this.spinner.show();
            return this.userService.assignUserRole({ userId: user._id, role });
          }
          return EMPTY;
        })
      )
      .subscribe({
        next: (res: boolean) => {
          this.spinner.hide();
          if (res) {
            this.toastrService.success('', 'User role updated successfully');
          }
        },
        error: (err: string) => {
          this.spinner.hide();
          this.toastrService.error(err, 'Something went wrong.');
        },
      });
  }

  toggleUserAccount(user: User) {
    this.dialogRef = this.dialog.open(ActionConfirmDialogComponent, {
      width: '550px',
      closeOnNavigation: true,
      data: {
        title: `Confirm account ${
          user.isActive ? 'deactivation' : 'activation'
        }`,
        messageLine1: `Are you sure you want to ${
          user.isActive ? 'deactivate' : 'activate'
        } account for ${user.firstName} ${user.lastName} ?`,
        successText: 'Confirm',
      },
    });

    this.dialogRef
      .afterClosed()
      .pipe(
        switchMap((res) => {
          if (res) {
            this.spinner.show();
            return this.userService.toggleAccountStatus(user._id);
          }
          return EMPTY;
        })
      )
      .subscribe({
        next: (res: boolean) => {
          this.spinner.hide();
          if (res) {
            this.toastrService.success('', 'User account updated successfully');
          }
        },
        error: (err: string) => {
          this.spinner.hide();
          this.toastrService.error(err, 'Something went wrong.');
        },
      });
  }
}
