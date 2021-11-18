import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { NavItem } from 'src/app/models/nav-item';
import { DrawerService } from 'src/app/services/drawer.service';
import { find } from 'lodash';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent implements OnInit {
  entities: NavItem[] = [];

  @ViewChild('drawer') drawer?: MatDrawer;

  constructor(
    private location: Location,
    private router: Router,
    private drawerService: DrawerService
  ) {
    this.drawerService.entities$.subscribe({
      next: (navItems: NavItem[]) => (this.entities = navItems),
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.drawer?.close();
      }
    });
  }

  get title() {
    let currentPath: any = this.location.prepareExternalUrl(
      this.location.path()
    );
    return (
      find(
        this.entities,
        (entity: NavItem) => currentPath.indexOf(entity.path) != -1
      )?.title || 'home'
    );
  }

  get icon() {
    let currentPath: any = this.location.prepareExternalUrl(
      this.location.path()
    );
    return (
      find(
        this.entities,
        (entity: NavItem) => currentPath.indexOf(entity.path) != -1
      )?.icontype || 'home'
    );
  }

  goBack() {
    if (this.icon == 'keyboard_backspace') {
      window.history.back();
    }
  }

  get isMobileDisplay() {
    return window.screen.width <= 576;
  }
}
