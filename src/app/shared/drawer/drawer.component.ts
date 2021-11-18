import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { NavItem } from 'src/app/models/nav-item';
import { User } from 'src/app/models/user';
import { DrawerService } from 'src/app/services/drawer.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements OnInit {
  entities$: Observable<NavItem[]>;
  user$: Observable<User>;

  constructor(
    private drawerService: DrawerService,
    private userService: UserService,
    private toastrService: ToastrService,
    private router: Router
  ) {
    this.entities$ = this.drawerService.entities$;
    this.user$ = this.userService.user$;
  }

  ngOnInit(): void {}

  signOut() {
    this.userService.signout();
    this.toastrService.success('', 'Signed out sucessfully!');
    this.router.navigate(['/products']);
  }
}
