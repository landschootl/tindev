import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TindevSharedModule } from '../../shared';
import {
    UserMatchingService,
    UserMatchingPopupService,
    UserMatchingComponent,
    UserMatchingDetailComponent,
    UserMatchingDialogComponent,
    UserMatchingPopupComponent,
    UserMatchingDeletePopupComponent,
    UserMatchingDeleteDialogComponent,
    userMatchingRoute,
    userMatchingPopupRoute,
    UserMatchingResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...userMatchingRoute,
    ...userMatchingPopupRoute,
];

@NgModule({
    imports: [
        TindevSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        UserMatchingComponent,
        UserMatchingDetailComponent,
        UserMatchingDialogComponent,
        UserMatchingDeleteDialogComponent,
        UserMatchingPopupComponent,
        UserMatchingDeletePopupComponent,
    ],
    entryComponents: [
        UserMatchingComponent,
        UserMatchingDialogComponent,
        UserMatchingPopupComponent,
        UserMatchingDeleteDialogComponent,
        UserMatchingDeletePopupComponent,
    ],
    providers: [
        UserMatchingService,
        UserMatchingPopupService,
        UserMatchingResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TindevUserMatchingModule {}
