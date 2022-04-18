/**
 * The UserProfileComponent renders mat card with user details, edit/delete buttons and list of favorite movie card. Movie mat card
 * has director, genre, synposis and delete buttons.
 * @module UserProfileComponent
 */

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

  /**
   * Injecting FetchApiDataService, MatDialog, MatSnackBar and Router dependency into UserProfileComponent contructor.
   * @param fetchDataApi Api Service Class
   * @param snackBar Class used to show notification
   * @param dialog Class used to show dialogs 
   * @param router Class that provides navigation among views
   */ 

  constructor(
    public fetchDataApi: FetchApiDataService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router,
  ) { }


  /**
   * Calls getInitData during component initialize to populate the data.
   */
  ngOnInit(): void {
    this.getInitData();
  }


  /**
   * Invokes getAllMovies API with movieID and user data. Response returns an array of movie objects and user favorite movie list 
   * is filtered.
   * @function getInitData
   */
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

  /**
   * Opens a dialog to display the Genre component.
   * @function openGenreDialog
   * @param name Genre of the clicked movie
   * @param description Description of the clicked movie 
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreModalComponent, {
      data: { name, description},
      width: '300px',
    });
  }

  /**
   * Opens a dialog to display the Director component.
   * @function openDirectorDialog
   * @param name Director name of the clicked movie 
   * @param bio Director bio of the clicked movie  
   * @param birth Director birthdate of the clicked movie 
   * @param death Director deathdate if available of the clicked movie 
   */
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

  /**
   * Converts date from string to Date object format
   * @function getFormatedDate
   * @param date Date in string
   * @param format Required date format   
   */
  getFormatedDate(date: any, format: string) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, format);
  }

  /**
   * Opens a dialog to display the Synposis component.
   * @function openSynposisDialog
   * @param title Title of the movie clicked
   * @param description Description of the clicked movie   
   */
  openSynposisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisModalComponent, {
      data: { title, description},
      width: '300px'
    });
  }

  /**
   * Opens a dialog to display the Edit User component.
   * @function openEditUserForm
   */
  openEditUserForm(): void{
    this.dialog.open(UpdateUserComponent, {
      width: '280px',
    });
  }

   /**
   * Invokes deleteFavoriteMovie api with movieID and user data. Api returns a user object with updated favorite list. 
   * If successful, updates a user object on local storage and shows a popup message after removing movie from user favorite list.
   * @function deleteFavoriteMovie
   * @param movie movie object clicked
   */
  deleteFavoriteMovie(movie: any): void{
    const movieId = movie._id;
    const title = movie.Title;

    this.fetchDataApi
        .deleteFavoriteMovie(movieId)
        .subscribe((resp) => {
          localStorage.setItem('user', JSON.stringify(resp));
          this.snackBar.open( `${title} has been removed from your favorite list`, 'OK', {
            duration: 2000,
          });
          this.ngOnInit();
        });
  }

  /**
   * Invokes User confirmation dialog to delete account or not
   */
  openDeleteUserFormDialog(): void {
    this.dialog.open(DeleteUserFormComponent, {
      width: '350px'
    })
  }
}
