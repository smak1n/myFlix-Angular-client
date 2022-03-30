import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://smak1n-myflix.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }
  // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }
        )
      }).pipe(map(this.extractResponseData), catchError(this.handleError)
    );
  }

  getSingleMovie(MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/${MovieID}`, {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }
        ),
      }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/director/:Name', {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }
        ),
      }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  getGenres(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'genres', {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }
        ),
      }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  getUserProfile(UserID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `users/${UserID}`, {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }
        ),
      }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  getFavoriteMovies(UserID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `users/${UserID}`, {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }
        ),
      }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  addFavoriteMovies(MovieID: string, UserID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .post(apiUrl + `users/${UserID}/movies/${MovieID}`, {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }
        ),
      }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  deleteFavoriteMovies(MovieID: string, UserID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + `users/${UserID}/movies/${MovieID}`, {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }
        ),
      }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  editUserProfile(UserID: string, userCredentials: object): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + `users/${UserID}`, userCredentials, {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }
        ),
      }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  public deleteUserProfile(UserID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + `users/${UserID}`, {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }
        ),
      }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }


  // Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  //Error handling function
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}