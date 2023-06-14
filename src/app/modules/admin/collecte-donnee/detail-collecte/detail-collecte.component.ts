import { Component, ViewEncapsulation, Input, HostListener, ElementRef, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { modiFormComponent } from './modiForm/modiForm.component';
import { OpenImageComponent } from './open-image/open-image.component';
import { rejeterFormComponent } from './rejeterForm/rejeterForm.component';

@Component({
    selector     : 'detail-collecte',
    styleUrls: ['./detail-collecte.component.scss'],
    templateUrl  : './detail-collecte.component.html',
    encapsulation: ViewEncapsulation.None
})
export class DetailCollecteComponent implements OnInit{
    longText = `The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog
                from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was
                originally bred for hunting.`;
    validateForm: FormGroup;
    
    detail =
        {
            equipement: 'Egouts',
            milieu: 'Rural', 
            typeEquipement: 'Assainissement', 
            caracteristique: 'Assainissement collectif', 
            etat : 'Mauvais',
            anomalie: 'Bouché', 
            numeroSerie: 560, 
            capacite: 20, 
            fabricant : 'SITC',
            dateImplantation: '17/03/2018',
        };

    constructor( 
        private _matDialog: MatDialog,
        private _formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
    ){}

    ngOnInit(): void {

    }

    openDialogImage(): void {
        const dialogRef = this._matDialog.open(OpenImageComponent, {
            // data: {
            //     visite: visite ? visite : undefined,
            // },
        });
    }

    valider(): void {
        // Open the dialog and save the reference of it
        const dialogRef = this._fuseConfirmationService.open({
            title  : 'Valider l\'enregistrement',
            message: 'Êtes-vous sûr de vouloir valider cette visite? <span class="font-medium">Cette action ne peut pas être annulée!</span>',
            icon:({
                show: true,
                name: 'heroicons_outline:check',
                color: 'success',
            }),
            actions: ({
                confirm: ({
                    show: true,
                    label: 'Valider',
                    color: 'primary',
                }),
            cancel: ({
                    show: true,
                    label: 'Annuler',
                }),
            }),
            dismissible: true,
        })
        // Subscribe to afterClosed from the dialog reference
        dialogRef.afterClosed().subscribe((result) => {
            if (result == 'confirmed') {
            }
        });
    }

    generateForm() {
        // this.validateForm = this._formBuilder.group({
        //     title: 'Validation de l\'enregistrement',
        //     message:
        //         'Êtes-vous sûr de vouloir valider cet enregistrement? <span class="font-medium">Cette action ne peut pas être annulée!</span>',
        //     icon: this._formBuilder.group({
        //         show: true,
        //         name: 'heroicons_outline:check',
        //         color: 'success',
        //     }),
        //     actions: this._formBuilder.group({
        //         confirm: this._formBuilder.group({
        //             show: true,
        //             label: 'Valider',
        //             color: 'primary',
        //         }),
        //     cancel: this._formBuilder.group({
        //             show: true,
        //             label: 'Annuler',
        //         }),
        //     }),
        //     dismissible: true,
        // });
    }

    openDialogRejeterForm(): void {
        const dialogRef = this._matDialog.open(rejeterFormComponent, {
            // data: {
            //     visite: visite ? visite : undefined,
            // },
        });

        // pour recuperer les donnée d'une ligne dans le modal
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
            }
        });
    }

    openDialogModiForm(): void {
        const dialogRef = this._matDialog.open(modiFormComponent, {
            // data: {
            //     visite: visite ? visite : undefined,
            // },
        });

        // pour recuperer les donnée d'une ligne dans le modal
        dialogRef.afterClosed().subscribe((result) => {
            if (result) {
            }
        });
    }

}
