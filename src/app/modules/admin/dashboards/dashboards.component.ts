import { Component, ViewEncapsulation, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardsService } from 'app/services/dashboards/dashboards.service';
import { ApexOptions } from 'ng-apexcharts';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'dashboards',
    templateUrl: './dashboards.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./dashboards.component.scss'],
})
export class DashboardsComponent implements OnInit, OnDestroy {
    chartVisitors: ApexOptions;
    chartConversions: ApexOptions;
    chartImpressions: ApexOptions;
    chartVisits: ApexOptions;
    chartVisitorsVsPageViews: ApexOptions;
    chartNewVsReturning: ApexOptions;
    chartGender: ApexOptions;
    chartAge: ApexOptions;
    chartLanguage: ApexOptions;
    data: any;
    chartEmployeSolicite: ApexOptions;
    chartProportion: ApexOptions;
    chartVisite: ApexOptions;
    chartEquipement: ApexOptions;
    dataLibelleVisite: any[] = ['Collectif', 'Non collectif '];
    dataLibelleEquipement: any[] = ['Assainissement', 'Drainage'];
    dataLibelleEmploye: any[] = [
        'Equipement de drainage',
        'Equipement de drainage',
        'Equipement de drainage',
        'Equipement de drainage',
    ];
    dataLibelleProportion: any[] = ['Bassins', 'Egouts', 'Dalots', 'Canaux'];
    valeur: any[] = [10, 15];
    valeurEmploye: any[] = [2, 10, 2, 3];
    valeurProportion: any[] = [2, 2, 20, 10];
    valeurEquipement: any[] = [2, 2, 20, 10];
    //graphe vue d'ensemble
    typeVueEnsemble = 'PieChart';
    dataStatutEquipement = [
        ['En attentes', 45.0],
        ['Validés', 26.8],
        ['Réjétés', 12.8],
    ];
    columnNames = ['Browser', 'Percentage'];
    options = { is3D: true };
    grapheStatutEquipement = {
        data: [],
        columnNames: ['Browser', 'Percentage'],
        options: {
            height: 250,
            width: 500,
            chartArea: {
                left: 30,
                width: '95%',
                height: '95%',
            },
            is3D: true,
            pieSliceText: 'percentage',
            slices: {
                2: { offset: 0.15 },
                8: { offset: 0.1 },
                10: { offset: 0.15 },
                11: { offset: 0.1 },
            },
        },
    };
    //Graphe type equipement d'assainissement et de drainage

    typeTypeEquipement = 'PieChart';
    dataTypeEquipement = [
        ['Assainissement', 45.0],
        ['Drainage', 26.8],
    ];

    grapheTypeEquipement = {
        data: [],
        columnNames: ['Browser', 'Percentage'],
        options: {
            height: 200,
            width: 300,
            chartArea: {
                right: 30,
                width: '95%',
                height: '95%',
            },
            is3D: true,
            pieSliceText: 'percentage',
            slices: {
                2: { offset: 0.15 },
                8: { offset: 0.1 },
            },
        },
    };

    //"Graphe equipement d'assainissement et de drainage"
    typeAssainissement = 'PieChart';
    dataTypeAssainissement = [
        ['Stations de pompage', 45.0],
        ['Stations de vidanges', 26.8],
    ];
    grapheTypeAssainissement = {
        data: [],
        columnNames: ['Browser', 'Percentage'],
        options: {
            height: 200,
            width: 300,
            chartArea: {
                right: 30,
                width: '95%',
                height: '95%',
            },
            is3D: true,
            pieSliceText: 'percentage',
            slices: {
                2: { offset: 0.15 },
                8: { offset: 0.1 },
                10: { offset: 0.15 },
                11: { offset: 0.1 },
            },
        },
    };

    //"Graphe equipement de drainage"
    typeDrainage = 'PieChart';
    dataTypeDrainage = [
        ['Canaux', 45.0],
        ['Dalots', 26.8],
        ['Egouts', 12.8],
        ['Bassins érecteurs', 8.5],
        ['Bassins tampons', 6.2],
    ];
    grapheTypeDrainage = {
        data: [],
        columnNames: ['Browser', 'Percentage'],
        options: {
            height: 200,
            width: 300,
            chartArea: {
                left: 30,
                width: '95%',
                height: '95%',
            },
            is3D: true,
            pieSliceText: 'percentage',
            slices: {
                2: { offset: 0.15 },
                8: { offset: 0.1 },
                10: { offset: 0.15 },
                11: { offset: 0.1 },
            },
        },
    };
    //Graphe suivi des equipements et le milieux dans lequel il se trouve
    type = 'PieChart';
    dataEquipement = [
        ['Canaux', 45.0],
        ['Dalots', 26.8],
        ['Egouts', 12.8],
        ['Bassins érecteurs', 8.5],
        ['Bassins tampons', 6.2],
        ['Stations de prétraitement et de pompage', 45.0],
        ['Stations de traitement des boues de vidanges', 26.8],
    ];
    grapheEquipement = {
        data: [],
        columnNames: ['Browser', 'Percentage'],
        options: {
            height: 200,
            width: 400,
            chartArea: {
                left: 30,
                width: '95%',
                height: '95%',
            },
            is3D: true,
            pieSliceText: 'percentage',
            slices: {
                2: { offset: 0.15 },
                8: { offset: 0.1 },
                10: { offset: 0.15 },
                11: { offset: 0.1 },
            },
        },
    };

    typeMilieux = 'PieChart';
    dataMilieux = [
        ['Urbain', 45.0],
        ['Per-urbain', 26.8],
        ['Rural', 12.8],
    ];
    grapheMilieux = {
        data: [],
        columnNames: ['Browser', 'Percentage'],
        options: {
            height: 200,
            width: 300,
            chartArea: {
                left: 30,
                width: '95%',
                height: '95%',
            },
            is3D: true,
            pieSliceText: 'percentage',
            slices: {
                2: { offset: 0.15 },
                8: { offset: 0.1 },
                10: { offset: 0.15 },
                11: { offset: 0.1 },
            },
        },
    };
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _dashboardsService: DashboardsService,
        private _router: Router
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        this._prepareChartData();
        this._prepareChartDataEmploye();
        this._prepareChartDataProportion();
        this._prepareChartDataEquipement();
        this.grapheStatutEquipement.data = this.dataStatutEquipement;
        this.grapheTypeEquipement.data = this.dataTypeEquipement;
        this.grapheTypeAssainissement.data = this.dataTypeAssainissement;
        this.grapheTypeDrainage.data = this.dataTypeDrainage;
        this.grapheEquipement.data = this.dataEquipement;
        this.grapheMilieux.data = this.dataMilieux;

        // Get the data
        this._dashboardsService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                // Store the data
                this.data = data;

                // Prepare the chart data
                this._prepareChartData();
            });

        // Attach SVG fill fixer to all ApexCharts
        window['Apex'] = {
            chart: {
                events: {
                    mounted: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    },
                    updated: (chart: any, options?: any): void => {
                        this._fixSvgFill(chart.el);
                    },
                },
            },
        };
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Fix the SVG fill references. This fix must be applied to all ApexCharts
     * charts in order to fix 'black color on gradient fills on certain browsers'
     * issue caused by the '<base>' tag.
     *
     * Fix based on https://gist.github.com/Kamshak/c84cdc175209d1a30f711abd6a81d472
     *
     * @param element
     * @private
     */
    private _fixSvgFill(element: Element): void {
        // Current URL
        const currentURL = this._router.url;

        // 1. Find all elements with 'fill' attribute within the element
        // 2. Filter out the ones that doesn't have cross reference so we only left with the ones that use the 'url(#id)' syntax
        // 3. Insert the 'currentURL' at the front of the 'fill' attribute value
        Array.from(element.querySelectorAll('*[fill]'))
            .filter((el) => el.getAttribute('fill').indexOf('url(') !== -1)
            .forEach((el) => {
                const attrVal = el.getAttribute('fill');
                el.setAttribute(
                    'fill',
                    `url(${currentURL}${attrVal.slice(attrVal.indexOf('#'))}`
                );
            });
    }

    /**
     * Prepare the chart data from the data
     *
     * @private
     */

    private _prepareChartData(): void {
        // visite
        this.chartVisite = {
            chart: {
                animations: {
                    speed: 400,
                    animateGradually: {
                        enabled: false,
                    },
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'donut',
                sparkline: {
                    enabled: true,
                },
            },
            colors: ['#3b82f6', '#22c55e'],
            labels: this.dataLibelleVisite,
            plotOptions: {
                pie: {
                    customScale: 1,
                    expandOnClick: false,
                    donut: {
                        size: '0%',
                    },
                },
            },
            series: this.valeur,
            states: {
                hover: {
                    filter: {
                        type: 'none',
                    },
                },
                active: {
                    filter: {
                        type: 'none',
                    },
                },
            },
            tooltip: {
                enabled: true,
                fillSeriesColor: false,
                theme: 'dark',
                custom: ({
                    seriesIndex,
                    w,
                }): string => `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
                                    <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                                    <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                                    <div class="ml-2 text-md font-bold leading-none">${w.config.series[seriesIndex]}</div>
                                </div>`,
            },
        };
    }

    private _prepareChartDataEmploye(): void {
        // employe
        this.chartEmployeSolicite = {
            chart: {
                animations: {
                    speed: 400,
                    animateGradually: {
                        enabled: false,
                    },
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'donut',
                sparkline: {
                    enabled: true,
                },
            },
            colors: ['#3b82f6', '#22c55e', '#e83e3e', '#f59e0b'],
            labels: this.dataLibelleEmploye,
            plotOptions: {
                pie: {
                    customScale: 1,
                    expandOnClick: false,
                    donut: {
                        size: '0%',
                    },
                },
            },

            series: this.valeurEmploye,
            states: {
                hover: {
                    filter: {
                        type: 'none',
                    },
                },
                active: {
                    filter: {
                        type: 'none',
                    },
                },
            },
            tooltip: {
                enabled: true,
                fillSeriesColor: false,
                theme: 'dark',
                custom: ({
                    seriesIndex,
                    w,
                }): string => `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
                                    <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                                    <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                                    <div class="ml-2 text-md font-bold leading-none">${w.config.series[seriesIndex]}</div>
                                </div>`,
            },
        };
    }

    private _prepareChartDataProportion(): void {
        // employe
        this.chartProportion = {
            chart: {
                animations: {
                    speed: 400,
                    animateGradually: {
                        enabled: false,
                    },
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'donut',
                sparkline: {
                    enabled: true,
                },
            },
            colors: ['#3b82f6', '#22c55e', '#e83e3e', '#f59e0b'],
            labels: this.dataLibelleProportion,
            plotOptions: {
                pie: {
                    customScale: 1,
                    expandOnClick: false,
                    donut: {
                        size: '0%',
                    },
                },
            },

            series: this.valeurProportion,
            states: {
                hover: {
                    filter: {
                        type: 'none',
                    },
                },
                active: {
                    filter: {
                        type: 'none',
                    },
                },
            },
            tooltip: {
                enabled: true,
                fillSeriesColor: false,
                theme: 'dark',
                custom: ({
                    seriesIndex,
                    w,
                }): string => `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
                                    <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                                    <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                                    <div class="ml-2 text-md font-bold leading-none">${w.config.series[seriesIndex]}</div>
                                </div>`,
            },
        };
    }

    private _prepareChartDataEquipement(): void {
        // visite
        this.chartEquipement = {
            chart: {
                animations: {
                    speed: 400,
                    animateGradually: {
                        enabled: false,
                    },
                },
                fontFamily: 'inherit',
                foreColor: 'inherit',
                height: '100%',
                type: 'donut',
                sparkline: {
                    enabled: true,
                },
            },
            colors: ['#3b82f6', '#22c55e'],
            labels: this.dataLibelleEquipement,
            plotOptions: {
                pie: {
                    customScale: 1,
                    expandOnClick: false,
                    donut: {
                        size: '0%',
                    },
                },
            },
            series: this.valeurEquipement,
            states: {
                hover: {
                    filter: {
                        type: 'none',
                    },
                },
                active: {
                    filter: {
                        type: 'none',
                    },
                },
            },
            tooltip: {
                enabled: true,
                fillSeriesColor: false,
                theme: 'dark',
                custom: ({
                    seriesIndex,
                    w,
                }): string => `<div class="flex items-center h-8 min-h-8 max-h-8 px-3">
                                    <div class="w-3 h-3 rounded-full" style="background-color: ${w.config.colors[seriesIndex]};"></div>
                                    <div class="ml-2 text-md leading-none">${w.config.labels[seriesIndex]}:</div>
                                    <div class="ml-2 text-md font-bold leading-none">${w.config.series[seriesIndex]}</div>
                                </div>`,
            },
        };
    }
}
