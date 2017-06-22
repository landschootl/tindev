import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TindevSharedModule } from '../../shared';
import {
    DomainService,
    DomainPopupService,
    DomainComponent,
    DomainDetailComponent,
    DomainDialogComponent,
    DomainPopupComponent,
    DomainDeletePopupComponent,
    DomainDeleteDialogComponent,
    domainRoute,
    domainPopupRoute,
} from './';

const ENTITY_STATES = [
    ...domainRoute,
    ...domainPopupRoute,
];

@NgModule({
    imports: [
        TindevSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        DomainComponent,
        DomainDetailComponent,
        DomainDialogComponent,
        DomainDeleteDialogComponent,
        DomainPopupComponent,
        DomainDeletePopupComponent,
    ],
    entryComponents: [
        DomainComponent,
        DomainDialogComponent,
        DomainPopupComponent,
        DomainDeleteDialogComponent,
        DomainDeletePopupComponent,
    ],
    providers: [
        DomainService,
        DomainPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TindevDomainModule {}
