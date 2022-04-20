/**
 * The GenreModalComponent renders a mat dialog containing information about the genre of a specific movie.
 * @module GenreModalComponent
 */

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-genre-modal',
  templateUrl: './genre-modal.component.html',
  styleUrls: ['./genre-modal.component.scss']
})

export class GenreModalComponent implements OnInit {

  constructor(
    /**
     * Injects data from MovieCardComponent into GenreCardComponent using the MAT_DIALOG_DATA injection token.
     * The data becomes a property on the class and is available to be output in the template.
     */

    @Inject(MAT_DIALOG_DATA) 
    public data: { name: string; description: string },
    public dialogRef: MatDialogRef<GenreModalComponent>
  ) { }

  ngOnInit(): void { }

  cancel(): void {
    this.dialogRef.close();
  }
}