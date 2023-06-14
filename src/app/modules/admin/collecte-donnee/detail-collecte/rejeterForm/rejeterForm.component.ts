import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'app/core/user/user.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector     : 'rejeter',
    templateUrl  : './rejeterForm.component.html',
    styleUrls    : ["./rejeterForm.component.scss"],
    encapsulation: ViewEncapsulation.None
})
export class rejeterFormComponent implements OnInit
{
    formFieldHelpers: string[] = [''];
    // rejeterForm: FormGroup;
    //variable contenant la liste des utilisateurs(employés)
    //retounée par la fonction getUtilisateur()
    // listeMotif: Motif[] = [];
    //contient l'utilisateur selectionné
    // motifs = new FormControl("", Validators.required);
    isLoading: boolean = false;
    // user: Utilisateur;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    /**
     * Constructor
     * 
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        public matDialogRef: MatDialogRef<rejeterFormComponent>,
        private _formBuilder: FormBuilder,
        private _snackBar: MatSnackBar,
        // private _motifService: MotifService,
        // private _userService: UserService,
        // @Inject(MAT_DIALOG_DATA) public data: { visite: Visite }
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

  // getMotif() {
  //   // this.inProgress = true; // Démarre le loader
  //   const getMotif = this._motifService.query({order: { id: 'DESC'}});

  //   getMotif.subscribe((result) => {
  //       this.listeMotif = result;
  //       console.log(this.listeMotif)
  //   });
  // }

  // generateForm(): void
  // {
  //   // Create the form
  //   this.rejeterForm = this._formBuilder.group({
      
  //   });
  // }
  
  // save(): void {
  //       // this.inProgress = true; // Démarre le loader
  //       const motif = {
  //         ...this.rejeterForm.value,
  //         motifs: this.user.utilisateurProfil[0].profil.id == 1? this.motifs.value : this.motifs.value,
  //         empty1: this.user.utilisateurProfil[0].profil.id == 1? "admin" : "employe"
  //       };
  //       // const send = this._visiteService.ValidationVisite(statutVisite);
  //       const send = this._visiteService.rejeterVisite(motif);
    
  //       send.subscribe(async (result) => {
  //         // this.inProgress = false; // stop le loader
  //         if (result) {
  //           this._snackBar.open('visite rejetée avec succès', 'Fermer', { duration: 2000, panelClass: ['success-snackbar'] });
  //           this.matDialogRef.close({ status: 'save' });
    
  //         } else {
  //           this._snackBar.open('Impossible de rejeter la visite', 'Fermer', { duration: 2000, panelClass: ['warning-snackbar'] });
  //         }
  //       },
  //         (err) => {
  //           this._snackBar.open('Erreur rejet  visite', 'Fermer', { duration: 2000, panelClass: ['error-snackbar'] });
  //         });
  //   }
    
  close(): void {
    // Close the dialog
    this.matDialogRef.close();
  }
 
}
