import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TindevSharedModule } from '../../shared';

import {
    MessageComponent,
    MessageDeleteDialogComponent,
    MessageDeletePopupComponent,
    MessageDetailComponent,
    MessageDialogComponent,
    MessagePopupComponent,
    messagePopupRoute,
    MessagePopupService,
    messageRoute,
    MessageService
} from './';

let ENTITY_STATES = [
    ...messageRoute,
    ...messagePopupRoute,
];

@NgModule({
    imports: [
        TindevSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MessageComponent,
        MessageDetailComponent,
        MessageDialogComponent,
        MessageDeleteDialogComponent,
        MessagePopupComponent,
        MessageDeletePopupComponent,
    ],
    entryComponents: [
        MessageComponent,
        MessageDialogComponent,
        MessagePopupComponent,
        MessageDeleteDialogComponent,
        MessageDeletePopupComponent,
    ],
    providers: [
        MessageService,
        MessagePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TindevMessageModule {}
