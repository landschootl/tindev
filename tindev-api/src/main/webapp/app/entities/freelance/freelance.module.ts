import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TindevSharedModule } from '../../shared';

import {
    FreelanceComponent,
    FreelanceDeleteDialogComponent,
    FreelanceDeletePopupComponent,
    FreelanceDetailComponent,
    FreelanceDialogComponent,
    FreelancePopupComponent,
    freelancePopupRoute,
    FreelancePopupService,
    freelanceRoute,
    FreelanceService
} from './';

const ENTITY_STATES = [
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
