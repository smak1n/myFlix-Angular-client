/**
 * The UserRegistrationFormComponent shows registration form for new user to register.
 * @module UserRegistrationFormComponent
 */

import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  /**
   * Injecting FetchApiDataService, MatDialog, MatSnackBar and Router dependency into UserRegistrationFormComponent contructor.
   * @param fetchApiData Api Service Class
   * @param dialogRef Class used to show dialogs 
   * @param snackBar Class used to show notification
   */ 
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  /**
   * Invokes registerUser fetchDataApi service and creates a new user. After successful signup, closes the dialog and a popup is 
   * displayed confirming registration success. If unsuccessful, a popup message asks the user to check the data entered.
   * @function registerUser
   */
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
    // Logic for a successful user registration goes here! (To be implemented)
      console.log(response);
      this.dialogRef.close(); // This will close the modal on success!
      this.snackBar.open('user registered successfully', 'OK', {
        duration: 2000
      });
    }, (response) => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}