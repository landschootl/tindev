import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TindevSharedModule } from '../../shared';
import {
    SpecialtyComponent,
    SpecialtyDeleteDialogComponent,
    SpecialtyDeletePopupComponent,
    SpecialtyDetailComponent,
    SpecialtyDialogComponent,
    SpecialtyPopupComponent,
    specialtyPopupRoute,
    SpecialtyPopupService,
    specialtyRoute,
    SpecialtyService
} from './';

const ENTITY_STATES = [
    ... specialtyRoute,
    ... specialtyPopupRoute,
];

@NgModule({
    imports: [
        TindevSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SpecialtyComponent,
        SpecialtyDetailComponent,
        SpecialtyDialogComponent,
        SpecialtyDeleteDialogComponent,
        SpecialtyPopupComponent,
        SpecialtyDeletePopupComponent,
    ],
    entryComponents: [
        SpecialtyComponent,
        SpecialtyDialogComponent,
        SpecialtyPopupComponent,
        SpecialtyDeleteDialogComponent,
        SpecialtyDeletePopupComponent,
    ],
    providers: [
        SpecialtyService,
        SpecialtyPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TindevSpecialtyModule {
}
