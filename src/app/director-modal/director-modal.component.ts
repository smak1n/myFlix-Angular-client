/**
 * The DirectorModalComponent renders a mat dialog containing information about the director of a specific movie.
 * @module DirectorModalComponent
 */

import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-director-modal',
  templateUrl: './director-modal.component.html',
  styleUrls: ['./director-modal.component.scss']
})

export class DirectorModalComponent implements OnInit {
  
  constructor(
    /**
     * Injects data from MovieCardComponent into DierctorCardComponent using the MAT_DIALOG_DATA injection token.
     * The data becomes a property on the class and is available to be output in the template.
     */

    @Inject(MAT_DIALOG_DATA)
    public data: { 
      name: string,
      bio: string,
      birth: string,
      death: string,
    },
    public dialogRef: MatDialogRef<DirectorModalComponent>
  ) { }

  ngOnInit(): void { }

  //cancel function to close dialog
  cancel(): void {
    this.dialogRef.close();
  }
}