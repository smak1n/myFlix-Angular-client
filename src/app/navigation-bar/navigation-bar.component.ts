/**
 * The NavigationBarComponent displays the navbar at the top of the page after the user has logged in. The navbar includes
 * links to the different routes of the app: "movies", "profile", and a button that allows users to logout.
 * @module NavigationBarComponent
 */

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  constructor(
    public router: Router
    ) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.router.navigate(['welcome']);
    localStorage.clear();
  }

}
