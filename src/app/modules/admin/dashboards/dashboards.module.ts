import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { Route, RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';
import { GoogleChartsModule } from 'angular-google-charts';
import { SharedModule } from 'app/shared/shared.module';
import { NgApexchartsModule } from 'ng-apexcharts';
import { DashboardsComponent } from './dashboards.component';

const dashboardsRoutes: Route[] = [
    {
        path: '',
        component: DashboardsComponent,
    },
];

@NgModule({
    declarations: [DashboardsComponent],
    imports: [
        RouterModule.forChild(dashboardsRoutes),
        MatTableModule,
        MatTabsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatProgressBarModule,
        MatRippleModule,
        MatSidenavModule,
        MatSortModule,
        NgApexchartsModule,
        TranslocoModule,
        SharedModule,
        GoogleChartsModule,
    ],
})
export class DashboardsModule {}
