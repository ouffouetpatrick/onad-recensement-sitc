import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RechercheService } from 'app/services/recherche/recherche.service';
import moment from 'moment';
import { TDocumentDefinitions } from 'pdfmake/build/pdfmake';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

export interface PeriodicElement {
    milieu: string;
    typeEquipement: string;
    caracteristique: string;
    equipement: string;
    etat : string;
    anomalie: string;
    dateImplantation : string;
    numeroSerie: number;
    capacite: number;
    fabricant : string
  }

@Component({
    selector     : 'gestion-etat',
    styleUrls : ['./gestion-etat.component.scss'],
    templateUrl  : './gestion-etat.component.html',
    encapsulation: ViewEncapsulation.None
})
export class GestionEtatComponent implements OnInit, AfterViewInit{
    SearchJourform: FormGroup;
    SearchSemaineform: FormGroup;
    SearchMoisform: FormGroup;
    SearchAnneeform: FormGroup;
    isLoading: boolean = false;
    searchInputControl: FormControl = new FormControl();

    mois: any[] = [
        {
            id: 1,
            name: 'Janvier',
        },
        {
            id: 2,
            name: 'Février',
        },
        {
            id: 3,
            name: 'Mars',
        },
        {
            id: 4,
            name: 'Avril',
        },
        {
            id: 5,
            name: 'Mai',
        },
        {
            id: 6,
            name: 'Juin',
        },
        {
            id: 7,
            name: 'Juillet',
        },
        {
            id: 8,
            name: 'Août',
        },
        {
            id: 9,
            name: 'Septembre',
        },
        {
            id: 10,
            name: 'Octobre',
        },
        {
            id: 11,
            name: 'Novembre',
        },
        {
            id: 12,
            name: 'Décembre',
        },
    ];
    annees: any[] = [];
    ListeSemaineGeneral: any[] = [];
    ListeAnneeGeneral: any[] = [];
    currentWeek: number;
    selectValue: String;

    listeStatut = [
        { id: 'All', libelle: 'Tous' },
        { id: '1', libelle: 'En attente' },
        { id: '2', libelle: 'Validée' },
        { id: '3', libelle: 'Réjetée' },
    ];

    displayedColumns: string[] = 
        [
            'equipement', 
            'milieu', 
            'typeEquipement', 
            'caracteristique', 
            'etat',
            'anomalie',
            'numeroSerie',
            'capacite',
            'fabricant',
            'dateImplantation'
        ];

    TABLE_DATA: PeriodicElement[] = [
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
            dateImplantation: '17/03/2018'
        },
        {
            equipement: 'Egouts',
            milieu: 'Urbain', 
            typeEquipement: 'Drainage', 
            caracteristique: 'Assainissement collectif', 
            etat : 'Moyen',
            anomalie: 'Endommagé',  
            numeroSerie: 6865, 
            capacite: 789, 
            fabricant : 'SITC',
            dateImplantation: '18/03/2015'
        },
      ];

    dataSource = this.TABLE_DATA;
    checked : string;
    recensementControle = new FormControl('Jour');

    // nomFichier: any = 'Liste_Visite';

    constructor(
        private _formBuilder: FormBuilder,
        private rechercheService: RechercheService,
    ){}


    ngOnInit(): void {
        this.selectValue = 'All';
        const dateActuel = new Date();
        const currentYear = dateActuel.getFullYear();

        this.initFormMois();
        this.initFormSemaine();
        this.initFormJour();

        // rempli le tableau des année pour la recherche annuelle
        for (var i = currentYear; i >= 2000; i--) {
            let el = {
                id: i,
                name: `${i}`,
            };
            this.annees.push(el);
            this.ListeAnneeGeneral.push(el);
        }

        // rempli le tableau des semaines pour la recherche hebdomadaire
        for (let j = 1; j <= 52; j++) {
            let element = { IdSemaine: j, NomSemaine: `${j}` };

            this.ListeSemaineGeneral.push(element);
        }

        // this.recensementControle = new FormControl('Jour');
        this.recensementControle = new FormControl(this.rechercheService.checked);

        this.checked = this.rechercheService.checked;
    }

    changeTab() {
        this.rechercheService.checked = this.recensementControle.value
    }

    ngAfterViewInit(): void {
        this.getCurrentWeek();
    }

    initFormJour(): void {
        this.SearchJourform = this._formBuilder.group({
            dateJour: [new Date()],
            statut: [''],
        });
    }

    initFormSemaine(): void {
        this.getCurrentWeek();
        const year = new Date().getFullYear();
        const debut_debut = moment()
            .day('Monday')
            .year(year)
            .week(this.currentWeek);
        const debut_fin = debut_debut.clone().weekday(7);
        this.SearchSemaineform = this._formBuilder.group({
            dateDebut: [debut_debut.toISOString()],
            dateFin: [debut_fin.toISOString()],
            semaine: [''],
            annee: [year],
            statut: ['']
        });
        
    }

    getCurrentWeek(): void {
        // retourne le numéro de la semaine dans laquelle on se trouce
        function getWeekNumber(date): any {
            // Copy date so don't modify original
            date = new Date(
                Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
            );
            // Set to nearest Thursday: current date + 4 - current day number
            // Make Sunday's day number 7
            date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
            // Get first day of year
            let yearStart: any = new Date(
                Date.UTC(date.getUTCFullYear(), 0, 1)
            );
            // Calculate full weeks to nearest Thursday
            let weekNo = Math.ceil(((date - yearStart) / 86400000 + 1) / 7);
            // Return array of year and week number
            return weekNo;
        }

        this.currentWeek = getWeekNumber(new Date());

        this.ListeSemaineGeneral.map((item) => {
            if (item.IdSemaine === this.currentWeek) {
                this.SearchSemaineform.patchValue({ semaine: item.IdSemaine });
            }
        });
    }

    initFormMois(): void {
        this.getCurrentWeek();
        const year = new Date().getFullYear();
        const debut_debut = moment()
            .day('Monday')
            .year(year)
            .week(this.currentWeek);
        const debut_fin = debut_debut.clone().weekday(7);
        this.SearchMoisform = this._formBuilder.group({
            mois: [1],
            annee: [year],
            statut: [''],
        });

    }

    getNewWeekDayInterval(annee, semaine = this.currentWeek): void {
        const newMoment = moment().set('year', annee);
        const dateDebut = moment()
            .day('Monday')
            .year(this.SearchSemaineform.value['annee'])
            .week(this.SearchSemaineform.value['semaine']);
        const dateFin = dateDebut.clone().weekday(7);

        this.SearchSemaineform.patchValue({
            dateDebut: dateDebut.toISOString(),
            dateFin: dateFin.toISOString(),
        });
    }

    exportPdf() {
        // Determination de la période suivant le type //
        var PeriodeEtat = null;

        const getLogo = this.rechercheService.getLogo();

        getLogo.subscribe(
            (result) => {
                const logo = result.logo_onad;

                PeriodeEtat =
                    [
                        {
                            style: 'styleTab',
                            table: {
                                widths: ['*', 'auto'],
                                body: [
                                    [
                                        {
                                            text: 'COLLECTE DE DONNEES',
                                            border: [false, false, false, true],
                                            style: 'header'
                                        },
                                        {
                                            image: logo,
                                            width: 100,
                                            height: 30,
                                            border: [false, false, false, true],

                                        }
                                    ],
                                ]
                            }
                        },

                        {
                            text: 'ETAT DES EQUIPEMENTS DU 07/02/2023',
                            style: 'subheader1'
                        },

                        {
                            text: 'DATE D\'IMPRESSION : 07/02/2023 12:00:00 : OUFFOUET PATRICK',
                            style: 'subheader2'
                        },

                        {
                            style: 'smarTab',
                            table: {
                                widths: [70, '*', 150, '*'],
                                body: [
                                    [
                                        {
                                            text: 'STATUT',
                                            style: 'smarTabText',
                                            fillColor: '#eeeeee',
                                        },
                                        {
                                            text: 'tous',
                                            alignment: 'center',
                                            style: 'smarTabText',
                                        },
                                        {
                                            text: 'TOTAL EQUIPEMENT',
                                            style: 'smarTabText',
                                            fillColor: '#eeeeee',

                                        },
                                        {
                                            text: '10',
                                            alignment: 'center',
                                            style: 'smarTabText',
                                        },
                                    ],
                                ]
                            },

                        },

                        {
                            text: 'LISTE DES EQUIPEMENTS',
                            style: 'headerListEquipement'
                        },
                    ];

                let rows: any[] = [


                    [
                        { text: 'Equipement', style: 'tableHeader' },
                        { text: 'Milieu', style: 'tableHeader' },
                        { text: 'Type equipement', style: 'tableHeader' },
                        { text: 'Caracteristique', style: 'tableHeader' },
                        { text: 'Etat', style: 'tableHeader' },
                        { text: 'Anomalie', style: 'tableHeader' },
                        { text: 'Numero serie', style: 'tableHeader' },
                        { text: 'Capacite', style: 'tableHeader' },
                        { text: 'Fabricant', style: 'tableHeader' },
                        { text: 'Date implantation', style: 'tableHeader' },
                    ],
                    [
                        'egout',
                        'rural',
                        'assainissement',
                        'assainissement collectif',
                        'mauvais',
                        'bouché',
                        '560',
                        '20',
                        'SITC',
                        '17/03/2018',
                    ],
                    [
                        'egout',
                        'urbain',
                        'assainissement',
                        'assainissement non collectif',
                        'mauvais',
                        'bouché',
                        '6745',
                        '79',
                        'SITC',
                        '17/03/2018',
                    ],

                ];

                const documentDefinition: TDocumentDefinitions = {

                    content: [
                        PeriodeEtat,
                        {
                            style: 'equipementTab',
                            table: {
                                body: rows,
                            },

                        },
                    ],
                    styles: {
                        header: {
                            fontSize: 16,
                            bold: true,
                        },
                        styleTab: {
                            lineHeight: 2,
                        },
                        subheader1: {
                            margin: [0, 19, 0, 10],
                            alignment: 'center',
                            bold: true
                        },
                        subheader2: {
                            margin: [0, 0, 0, 20],
                            alignment: 'center',
                            fontSize: 10,
                            bold: true
                        },
                        smarTab: {
                            margin: [0, 0, 0, 20],
                        },
                        smarTabText: {
                            fontSize: 10,
                        },
                        headerListEquipement: {
                            alignment: 'center',
                            decoration: 'underline',
                            lineHeight: 1.5
                        },
                        equipementTab: {
                            margin: [0, 5, 0, 15],
                            fontSize: 8,
                        },
                        tableHeader: {
                            bold: true,
                            fontSize: 8,
                            fillColor: '#eeeeee',
                        },
                    }
                };
                pdfMake.createPdf(documentDefinition).open();
            }
        )

    }

}
