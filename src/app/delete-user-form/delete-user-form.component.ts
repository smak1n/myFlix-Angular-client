import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user-form',
  templateUrl: './delete-user-form.component.html',
  styleUrls: ['./delete-user-form.component.scss']
})
export class DeleteUserFormComponent implements OnInit {
  user: any = {};

  constructor(
    public FetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<DeleteUserFormComponent>,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  //Upon deletion, user will be removed, local  storage cleared and the user will be brought back to welcome page  
  deleteUser(): void {
    const { Username } = this.user;

    this.FetchApiData.deleteUserProfile(Username).subscribe(() => {
      this.snackBar.open('Your account was deleted successfully', 'x', {
        duration: 4000,
      });
    });
    localStorage.clear();
    this.router.navigate(['welcome']);
    this.dialogRef.close();
  }

  //cancel function to close dialog
  cancel(): void {
    this.dialogRef.close();
  }
}
