/**
 * The SynopsisModalComponent renders a mat dialog containing the synopsis of a specific movie.
 * @module SynopsisModalComponent
 */

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-synopsis-modal',
  templateUrl: './synopsis-modal.component.html',
  styleUrls: ['./synopsis-modal.component.scss']
})

export class SynopsisModalComponent implements OnInit {
  constructor(
    /**
     * Injects data from MovieCardComponent into SynopisCardComponent using the MAT_DIALOG_DATA injection token.
     * The data becomes a property on the class and is available to be output in the template.
     */

    @Inject(MAT_DIALOG_DATA) public data: 
    {
      title: string,
      description: string 
    },
    public dialogRef: MatDialogRef<SynopsisModalComponent>
  ) { }

  ngOnInit(): void { }

  //cancel function to close dialog
  cancel(): void {
    this.dialogRef.close();
  }
}