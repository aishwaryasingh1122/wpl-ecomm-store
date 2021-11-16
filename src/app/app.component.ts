import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private swUpdate: SwUpdate, private snackbar: MatSnackBar) {}

  ngOnInit() {
    this.swUpdate.versionUpdates.subscribe((evt) => {
      this.swUpdate.checkForUpdate().then(() => {
        const snack = this.snackbar.open('App update available', 'Update now');
        snack.onAction().subscribe(() => {
          window.location.reload();
        });
      });
    });
  }
}
