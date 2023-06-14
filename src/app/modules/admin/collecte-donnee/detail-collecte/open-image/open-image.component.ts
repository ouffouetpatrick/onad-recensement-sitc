import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector     : 'open-image',
    styleUrls: ['./open-image.component.scss'],
    templateUrl  : './open-image.component.html',
    encapsulation: ViewEncapsulation.None
})
export class OpenImageComponent
{

    constructor(
        public matDialogRef: MatDialogRef<OpenImageComponent>,
    ){}

    close(): void {
        // Close the dialog
        this.matDialogRef.close();
      }
}
