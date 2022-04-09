import { DatePipe } from '@angular/common';
import { UpdateUserComponent } from './../update-user/update-user.component';
import { SynopsisModalComponent } from './../synopsis-modal/synopsis-modal.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchApiDataService } from './../fetch-api-data.service';
import { GenreModalComponent } from './../genre-modal/genre-modal.component';
import { DirectorModalComponent } from '../director-modal/director-modal.component';
import { DeleteUserFormComponent } from '../delete-user-form/delete-user-form.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  favoriteMovies: any[] = [];

  constructor(
    public fetchDataApi: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.getInitData();
  }

  getInitData(): void{
    this.user = JSON.parse(localStorage.getItem('user') || '{}');  
    const userFavList = this.user.FavoriteMovies;

    // fetching movies data and filter user favorite movies
    this.fetchDataApi
        .getAllMovies()
        .subscribe((resp: any) => {
          this.favoriteMovies = resp.filter((movie: any) => userFavList.includes(movie._id));
          return this.favoriteMovies;          
        });
  }

  // open a dialog to dispaly Genre details
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreModalComponent, {
      data: { name, description},
      width: '300px',
    });
  }

  // open a dialog to display director details
  openDirectorDialog( 
    name: string, 
    bio: string ,
    birth: string,
    death: string 
  ) : void {
    death = (death === undefined) ? 'N/A' : death;
    birth = this.getFormatedDate(birth,'MM-dd-yyyy') || 'null';
    this.dialog.open(DirectorModalComponent, {
      data: { name, bio, birth, death },
      width: '300px'
    });
  }

  // format date
  getFormatedDate(date: any, format: string) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, format);
  }

  // open a dialog to display movie deatils
  openSynposisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisModalComponent, {
      data: { title, description},
      width: '300px'
    });
  }

  // open a dialog to update user details
  openEditUserForm(): void{
    this.dialog.open(UpdateUserComponent, {
      width: '280px',
    });
  }

  // api request for deleting movie to user favorite list
  deleteFavoriteMovie(movie: any): void{
    const movieId = movie._id;
    const title = movie.Title;

    this.fetchDataApi
        .deleteFavoriteMovies(movieId)
        .subscribe((resp) => {
          localStorage.setItem('user', JSON.stringify(resp));
          this.snackBar.open( `${title} has been removed from your favorite list`, 'OK', {
            duration: 2000,
          });
          this.ngOnInit();
        });
  }

  // function to open the delete profile dialog
  openDeleteUserFormDialog(): void {
    this.dialog.open(DeleteUserFormComponent, {
      width: '350px'
    })
  }
}
