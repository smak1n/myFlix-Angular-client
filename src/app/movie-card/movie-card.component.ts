/**
 * The MovieCardComponent renders list of movies fetched from myFlix API.
 * Movie card component displays movie title, image and director/genre/synposis/fav buttons.
 * @module MovieCardComponent
 */

import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GenreModalComponent } from '../genre-modal/genre-modal.component';
import { DirectorModalComponent } from '../director-modal/director-modal.component';
import { SynopsisModalComponent } from '../synopsis-modal/synopsis-modal.component';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovies: any[] = [];


  /**
   * Injecting FetchApiDataService, MatDialog and MatSnackBar dependency into MovieCardComponent contructor.
   * @param fetchDataApi Api Service Class
   * @param dialog Class used to show dialogs 
   * @param snackBar Class used to show notification
   */ 
  constructor(
    public fetchDataApi: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {}
  
  /**
   * Calls getMovies and getFavoriteMovies during component initialize to populate the data.
   */
  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }
  
  /**
   * Invokes getAllMovies fetchDataApi service and populates the movie array with response.
   * @function getMovies
   * @returns an array of movie objects in JSON format
   */
  getMovies(): void {
    this.fetchDataApi
        .getAllMovies()
        .subscribe((resp: any) => {
          this.movies = resp;
          return this.movies;          
        });
  }

  /**
   * getFavoriteMovies function fetch user data from local storage.
   * @function getFavoriteMovies 
   */
  getFavoriteMovies(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.favoriteMovies = user.FavoriteMovies;    
  }

  /**
   * Invokes addFavoriteMovie api with movieID and user data. API returns a user object with updated favorite list. 
   * If successful, updates a user object on local storage and shows a popup message after adding movie to user favorite list.
   * @function addFavoriteMovie
   * @param movieId id of the clicked movie
   * @param title Title of the clicked movie  
   */
  addFavoriteMovie(movieId: string, title: string): void{
    this.fetchDataApi
        .addFavoriteMovies(movieId)
        .subscribe((resp) => {
          localStorage.setItem('user', JSON.stringify(resp));
          this.snackBar.open( `${title} has been added to your favorite list`, 'OK', {
            duration: 2000,
          });
          this.ngOnInit();
        });
  }

  /**
   * Invokes deleteFavoriteMovie api with movieID and user data. Api returns a user object with updated favorite list. 
   * If successful, updates a user object on local storage and shows a popup message after removing movie from user favorite list.
   * @function deleteFavoriteMovie
   * @param movieId id of the clicked movie
   * @param title Title of the clicked movie  
   */
  deleteFavoriteMovie(movieId: string, title: string): void{
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
   * @param death Director deathdate of the clicked movie 
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
   * @param title Title of the clicked movie
   * @param description Description of the clicked movie
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisModalComponent, {
      data: { title, description},
      width: '300px'
    });
  }


  /**
   * isFavorite function checks whether movie is user favorite
   * @function isFavorite
   * @param movieID string
   * @returns boolean 
   */
  isFavorite(movieID: string): boolean {    
    return this.favoriteMovies.some( id => id === movieID);
  } 

  /**
   * toggleFavoriteMovie function adds or removes a movie from user favorite list 
   * @function toggleFavoriteMovie
   * @returns addFavoriteMovie or deleteFavoriteMovie function  
   */
  toggleFavoriteMovie(movie: any): void {
    this.isFavorite(movie._id)
      ? this.deleteFavoriteMovie(movie._id, movie.Title)
      : this.addFavoriteMovie(movie._id, movie.Title);
  }
}

