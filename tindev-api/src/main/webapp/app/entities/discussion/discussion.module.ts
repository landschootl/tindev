import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TindevSharedModule } from '../../shared';
import {
    DiscussionService,
    DiscussionPopupService,
    DiscussionComponent,
    DiscussionDetailComponent,
    DiscussionDialogComponent,
    DiscussionPopupComponent,
    DiscussionDeletePopupComponent,
    DiscussionDeleteDialogComponent,
    discussionRoute,
    discussionPopupRoute,
} from './';

const ENTITY_STATES = [
    ...discussionRoute,
    ...discussionPopupRoute,
];

@NgModule({
    imports: [
        TindevSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DiscussionComponent,
        DiscussionDetailComponent,
        DiscussionDialogComponent,
        DiscussionDeleteDialogComponent,
        DiscussionPopupComponent,
        DiscussionDeletePopupComponent,
    ],
    entryComponents: [
        DiscussionComponent,
        DiscussionDialogComponent,
        DiscussionPopupComponent,
        DiscussionDeleteDialogComponent,
        DiscussionDeletePopupComponent,
    ],
    providers: [
        DiscussionService,
        DiscussionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TindevDiscussionModule {}
