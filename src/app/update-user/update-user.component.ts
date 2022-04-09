import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from './../fetch-api-data.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  user: any = JSON.parse(localStorage.getItem('user') || '{}');

  @Input()
  userData = {
    Username: this.user.Username,
    Password: '',
    Email: this.user.Email,
    Birthday: this.getFormatedDate(this.user.Birthday,'yyyy-MM-dd'),
  };

  constructor(
    public FetchApiDataService: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialogRef<UpdateUserComponent>,
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  // format date
  getFormatedDate(date: Date, format: string) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, format);
  }

  getUser(): void{
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }

  updateUser(): void{    
    this.FetchApiDataService
        .editUserProfile(this.user.Username, this.userData)
        .subscribe(resp =>{
          this.dialog.close();
          console.log(resp);
          
          // update local storage
          localStorage.setItem('user', JSON.stringify(resp));

          this.snackBar.open('Profile data updated successfully', 'OK',{
            duration: 4000,
          });
          window.location.reload();
        })
  }
}