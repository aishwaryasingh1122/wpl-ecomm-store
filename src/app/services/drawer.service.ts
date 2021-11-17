import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ADMIN_ENTITIES, USER_ENTITIES } from '../constants';
import { NavItem } from '../models/nav-item';
import { User } from '../models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class DrawerService {
  private adminEntites: NavItem[] = [...ADMIN_ENTITIES];
  private userEntities: NavItem[] = [...USER_ENTITIES];

  private subject = new BehaviorSubject(this.userEntities);
  entities$: Observable<NavItem[]> = this.subject.asObservable();

  constructor(private userService: UserService) {
    this.userService.user$.subscribe({
      next: (user: User) => {
        if (user._id !== 'guest' && user.role >= 1) {
          const drawerEntities: NavItem[] = [
            ...this.userEntities,
            ...this.adminEntites,
          ];

          this.subject.next(drawerEntities);
        } else {
          this.subject.next([...this.userEntities]);
        }
      },
    });
  }
}
