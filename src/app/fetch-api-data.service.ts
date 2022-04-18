/**
 * The FetchApiDataService is used to make HTTP requests to the myFlix movie API to retrieve data on movies
 * and users, to register and login users, update their information, and to add/remove movies to/from
 * their list of favorite movies. The class is marked with the Injectible decorator and injected as a dependency
 * to the root component, thereby making the service available to all other components.
 * @module FetchApiDataService
 */

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
  /**
   * Inject the HttpClient module to the constructor params
   * This will provide HttpClient to the entire class, making it available via this.http
   */

  constructor(private http: HttpClient) {
  }

  /**
   * Making the API call for the user registration endpoint
   * @function userRegistration
   * @method POST
   * @param userDetails 
   * @returns a user object JSON format
   */

  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }


  /**
   * Making the API call for the user login endpoint
   * @function userLogin
   * @method POST
   * @param userDetails 
   * @returns a user object in JSON format
   */

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
    * Making the API call to get all movies
    * @function getAllMovies
    * @method GET
    * @returns an array of movie objects in JSON format
    */

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

  // api request for get a movies by title

  /**
  * Making API call to get a matched movie by title
  * @function getMovieByTitle
  * @method GET
  * @param Title movie Title
  * @returns A movie object with matched title in JSON format
  */

  getMovieByTitle(Title: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `movies/' + ${Title}`, {
        headers: new HttpHeaders(
          {
            Authorization: `Bearer ${token}`,
          }
       )
      }).pipe(map(this.extractResponseData), catchError(this.handleError)
    );
  }


  /**
    * Making API call to get a director data by director's name
    * @function getDirector
    * @method GET
    * @returns A director object with matched title in JSON format
    */

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


  /**
    * Making API call to get genres
    * @function getGenre
    * @method GET
    * @returns A genre object with matched title in JSON format
    */

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

  /**
   * Making API call to get user's data by Username
   * @function getUserProfile
   * @method GET
   * @param Username
   * @returns a user object in JSON format
   */

  getUserProfile(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/' + Username, {
        headers: new HttpHeaders(
          {
            Authorization: `Bearer ${token}`,
          }
        ),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }


  /**
   * Making API call to the end-point, to add a movie to user's favorite list
   * @function addFavoriteMovies
   * @method POST
   * @param MovieID {any}
   * @returns selected movie is added to favorites list
   */


  addFavoriteMovies(MovieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    return this.http
      .post(apiUrl + `users/${user.Username}/movies/${MovieID}`, MovieID, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        })
      })
      .pipe(        
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Making API call to the end-point, to remove a movie from user's favorite list
   * @function deleteFavoriteMovie
   * @method DELETE
   * @param MovieID {any}
   * @returns selected movies is removed form favorites list
   */

  deleteFavoriteMovie(MovieID: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http
      .delete(apiUrl + 'users/'+ user.Username + '/movies/' + MovieID, {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          }
        ),
      }).pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Making API call to the end-point, to edit user's data
   * @param Username {any}
   * @param userDetails {any}
   * @returns updated user's informations in json format
   */

  editUserProfile(Username: any, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http
      .put(apiUrl + 'users/' + user.Username, userDetails, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }


  /**
   * Making API call to the end-point to delete the current user
   * @param Username {any}
   * @returns deleted status
   */

  deleteUserProfile(Username: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return this.http
      .delete(apiUrl + 'users/' + user.Username, {
        headers: new HttpHeaders({
          Authorization: `Bearer ${token}`,
        })
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }


  /**
   * Non-typed response extracttion
   * @param res {any}
   * @returns response || empty object
   */
  
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  /**
   * Handles error responses to HTTP requests.
   * @param error the HttpErrorResponse
   * @returns error messages
   */
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