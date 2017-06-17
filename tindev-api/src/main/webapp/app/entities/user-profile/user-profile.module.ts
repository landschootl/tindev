import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TindevSharedModule } from '../../shared';

import {
    UserProfileComponent,
    UserProfileDeleteDialogComponent,
    UserProfileDeletePopupComponent,
    UserProfileDetailComponent,
    UserProfileDialogComponent,
    UserProfilePopupComponent,
    userProfilePopupRoute,
    UserProfilePopupService,
    userProfileRoute,
    UserProfileService
} from './';

const ENTITY_STATES = [
    ... userProfileRoute,
    ... userProfilePopupRoute,
];

@NgModule({
    imports: [
        TindevSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        UserProfileComponent,
        UserProfileDetailComponent,
        UserProfileDialogComponent,
        UserProfileDeleteDialogComponent,
        UserProfilePopupComponent,
        UserProfileDeletePopupComponent,
    ],
    entryComponents: [
        UserProfileComponent,
        UserProfileDialogComponent,
        UserProfilePopupComponent,
        UserProfileDeleteDialogComponent,
        UserProfileDeletePopupComponent,
    ],
    providers: [
        UserProfileService,
        UserProfilePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TindevUserProfileModule {
}
