/**
 * The UserLoginFormComponent is show login form for entering user details.
 * @module UserLoginFormComponent
 */

import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: ''};


  /**
   * Injecting FetchApiDataService, MatDialog, MatSnackBar and Router dependency into UserLoginFormComponent contructor.
   * @param fetchApiData Api Service Class
   * @param dialogRef Class used to show dialogs 
   * @param snackBar Class used to show notification
   * @param router Class that provides navigation among views
   */ 
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  /**
   * Invokes userLogin fetchApiData service and authenticates the user credentials. After successful login, navigates to movies route. From response
   * userID, auth Token and user data is extrcated and stored in local storage. A popup is displayed confirming login success. If unsuccessful, a 
   * popup message asks the user to check their username and password.
   * @function loginUser
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((response) => {
      // Logic for a successful user registration goes here! (To be implemented)
      console.log(response);
      localStorage.setItem('user', JSON.stringify(response.user));
      localStorage.setItem('token', response.token);
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('user logged in successfully', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}