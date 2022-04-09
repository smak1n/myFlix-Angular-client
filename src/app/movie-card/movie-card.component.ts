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

  constructor(
    public fetchDataApi: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }
  
  // fetching movies data
  getMovies(): void {
    this.fetchDataApi
        .getAllMovies()
        .subscribe((resp: any) => {
          this.movies = resp;
          return this.movies;          
        });
  }

  // fetching favorite movies data
  getFavoriteMovies(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.favoriteMovies = user.FavoriteMovies;    
  }

  // api request for adding movie to user favorite list
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

  // api request for deleting movie to user favorite list
  deleteFavoriteMovie(movieId: string, title: string): void{
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
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisModalComponent, {
      data: { title, description},
      width: '300px'
    });
  }


  // check whether movie is user favorite?
  isFavorite(movieID: string): boolean {    
    return this.favoriteMovies.some( id => id === movieID);
  } 

  // add or remove movie from user favorite list
  toggleFavoriteMovie(movie: any): void {
    this.isFavorite(movie._id)
      ? this.deleteFavoriteMovie(movie._id, movie.Title)
      : this.addFavoriteMovie(movie._id, movie.Title);
  }
}

