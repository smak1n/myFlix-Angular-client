/**
 * The WelcomePageComponent renders Welcome message, signup and login button. 
 * OnClick of login button, login form will be showed in mat dialog. 
 * OnClick of signup button, signup form will be showed in mat dialog. 
 * @module WelcomePageComponent
 */

import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {

  title = 'myFlix-Angular-client';
  /**
   * Injecting FetchApiDataService, MatDialog and MatSnackBar dependency into MovieCardComponent contructor.
   * @param dialog Class used to show dialogs 
   */ 
  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  /**
   * Opens a dialog to display the Login component.
   * @function openUserRegistrationDialog 
   */
  openUserRegistrationDialog(): void {
      this.dialog.open(UserRegistrationFormComponent, {
      width: '280px'
    });
  }

  /**
   * Opens a dialog to display the Login component.
   * @function openUserLoginDialog 
   */
  openUserLoginDialog(): void {
    this.dialog.open(UserLoginFormComponent, {
      width: '280px'
    });
  }
}
