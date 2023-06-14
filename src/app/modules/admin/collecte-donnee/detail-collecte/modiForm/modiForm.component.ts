import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'app/core/user/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector     : 'modifier',
    templateUrl  : './modiForm.component.html',
    styleUrls    : ["./modiForm.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class modiFormComponent implements OnInit
{
    formFieldHelpers: string[] = [''];
    // modiForm: FormGroup;
    isLoading: boolean = false;
    // user: Utilisateur;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    /**
     * Constructor
     * 
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<modiFormComponent>,
        private _formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
    )
    {
    }

    /**
     * On init
     */

    ngOnInit(): void{
      // this.getMotif()
      // this.generateForm();
    }

  close(): void {
    // Close the dialog
    this.matDialogRef.close();
  }
 
}
