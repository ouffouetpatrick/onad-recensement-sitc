import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RechercheService } from 'app/services/recherche/recherche.service';
import moment from 'moment';

export interface PeriodicElement {
    milieu: string;
    typeEquipement: string;
    caracteristique: string;
    equipement: string;
    etat : string;
    anomalie: string;
    numeroSerie: number;
    capacite: number;
    dateImplantation : string;
    fabricant : string;
    statut : string;
    action : string
  }

@Component({
    selector     : 'collecte-donnee',
    styleUrls: ['./collecte-donnee.component.scss'],
    templateUrl  : './collecte-donnee.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class collecteDonneeComponent implements OnInit, AfterViewInit{
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
            // 'fabricant',
            // 'dateImplantation',
            // 'statut',
            'action'
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
            dateImplantation: '17/03/2018',
            statut: 'En attente',
            action: 'detail'
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
            dateImplantation: '18/03/2015',
            statut: 'En attente',
            action : 'detail'
        },
      ];

    dataSource = this.TABLE_DATA;

    checked : string;
    recensementControle = new FormControl('Jour');

    constructor(
        private _formBuilder: FormBuilder,
        private rechercheService: RechercheService,
    ){}


    ngOnInit(): void {
        const dateActuel = new Date();
        const currentYear = dateActuel.getFullYear();

        this.initFormAnnee();
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
            annee: [year]
        });
        
    }

    initFormAnnee(): void {
        this.getCurrentWeek();
        const year = new Date().getFullYear();
        const debut_debut = moment()
            .day('Monday')
            .year(year)
            .week(this.currentWeek);
        const debut_fin = debut_debut.clone().weekday(7);
        const all = 'Tous';
        this.SearchAnneeform = this._formBuilder.group({
            annee: [year],
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

}
