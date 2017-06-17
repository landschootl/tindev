import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TindevSharedModule } from '../../shared';
import {
    MatchingComponent,
    MatchingDeleteDialogComponent,
    MatchingDeletePopupComponent,
    MatchingDetailComponent,
    MatchingDialogComponent,
    MatchingPopupComponent,
    matchingPopupRoute,
    MatchingPopupService,
    MatchingResolvePagingParams,
    matchingRoute,
    MatchingService
} from './';

const ENTITY_STATES = [
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
