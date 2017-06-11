import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TindevSharedModule } from '../../shared';

import {
    MatchingService,
    MatchingPopupService,
    MatchingComponent,
    MatchingDetailComponent,
    MatchingDialogComponent,
    MatchingPopupComponent,
    MatchingDeletePopupComponent,
    MatchingDeleteDialogComponent,
    matchingRoute,
    matchingPopupRoute,
    MatchingResolvePagingParams,
} from './';

let ENTITY_STATES = [
    ...matchingRoute,
    ...matchingPopupRoute,
];

@NgModule({
    imports: [
        TindevSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MatchingComponent,
        MatchingDetailComponent,
        MatchingDialogComponent,
        MatchingDeleteDialogComponent,
        MatchingPopupComponent,
        MatchingDeletePopupComponent,
    ],
    entryComponents: [
        MatchingComponent,
        MatchingDialogComponent,
        MatchingPopupComponent,
        MatchingDeleteDialogComponent,
        MatchingDeletePopupComponent,
    ],
    providers: [
        MatchingService,
        MatchingPopupService,
        MatchingResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TindevMatchingModule {}
