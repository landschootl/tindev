import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TindevSharedModule } from '../../shared';

import {
    FreelanceService,
    FreelancePopupService,
    FreelanceComponent,
    FreelanceDetailComponent,
    FreelanceDialogComponent,
    FreelancePopupComponent,
    FreelanceDeletePopupComponent,
    FreelanceDeleteDialogComponent,
    freelanceRoute,
    freelancePopupRoute,
} from './';

let ENTITY_STATES = [
    ...freelanceRoute,
    ...freelancePopupRoute,
];

@NgModule({
    imports: [
        TindevSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        FreelanceComponent,
        FreelanceDetailComponent,
        FreelanceDialogComponent,
        FreelanceDeleteDialogComponent,
        FreelancePopupComponent,
        FreelanceDeletePopupComponent,
    ],
    entryComponents: [
        FreelanceComponent,
        FreelanceDialogComponent,
        FreelancePopupComponent,
        FreelanceDeleteDialogComponent,
        FreelanceDeletePopupComponent,
    ],
    providers: [
        FreelanceService,
        FreelancePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TindevFreelanceModule {}
