import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TindevSharedModule } from '../../shared';
import {
    RecruiterService,
    RecruiterPopupService,
    RecruiterComponent,
    RecruiterDetailComponent,
    RecruiterDialogComponent,
    RecruiterPopupComponent,
    RecruiterDeletePopupComponent,
    RecruiterDeleteDialogComponent,
    recruiterRoute,
    recruiterPopupRoute,
} from './';

const ENTITY_STATES = [
    ...recruiterRoute,
    ...recruiterPopupRoute,
];

@NgModule({
    imports: [
        TindevSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        RecruiterComponent,
        RecruiterDetailComponent,
        RecruiterDialogComponent,
        RecruiterDeleteDialogComponent,
        RecruiterPopupComponent,
        RecruiterDeletePopupComponent,
    ],
    entryComponents: [
        RecruiterComponent,
        RecruiterDialogComponent,
        RecruiterPopupComponent,
        RecruiterDeleteDialogComponent,
        RecruiterDeletePopupComponent,
    ],
    providers: [
        RecruiterService,
        RecruiterPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TindevRecruiterModule {}
