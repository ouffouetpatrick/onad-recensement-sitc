import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatRadioModule } from '@angular/material/radio';
import { QuillModule } from 'ngx-quill';
import { SharedModule } from 'app/shared/shared.module';
import { FuseCardModule } from '@fuse/components/card';
import { MatTreeModule } from '@angular/material/tree';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {  MatBadgeModule } from '@angular/material/badge';
import { DetailCollecteComponent } from './detail-collecte/detail-collecte.component';
import { modiFormComponent } from './detail-collecte/modiForm/modiForm.component';
import { OpenImageComponent } from './detail-collecte/open-image/open-image.component';
import { rejeterFormComponent } from './detail-collecte/rejeterForm/rejeterForm.component';
import { collecteDonneeComponent } from './collecte-donnee.component';
 

const equipementRoutes: Route[] = [
    {
        path     : '',
        component: collecteDonneeComponent
    },
    {
        path: 'detail-collecte',
        component: DetailCollecteComponent,
      },
];

@NgModule({
    declarations: [
        collecteDonneeComponent,
        DetailCollecteComponent,
        rejeterFormComponent,
        OpenImageComponent,
        modiFormComponent
    ],
    imports     : [
        RouterModule.forChild(equipementRoutes),
        MatIconModule,
        MatTabsModule,
        MatTableModule,
        MatButtonModule,
        MatCheckboxModule,
        MatDividerModule,
        MatFormFieldModule,
        MatMenuModule,
        MatRadioModule,
        MatSelectModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        MatInputModule,
        MatGridListModule,
        MatToolbarModule,
        MatPaginatorModule,
        MatSnackBarModule,
        MatDialogModule,
        MatTooltipModule,
        MatFormFieldModule,
        SharedModule,
        QuillModule.forRoot(),
        FuseCardModule,
        MatTreeModule,
        MatListModule,
        MatCardModule,
        MatBadgeModule,
    ],

    
})
export class CollecteDonneeModule
{
}
