import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TindevSharedModule } from '../../shared';
import {
    DomainComponent,
    DomainDeleteDialogComponent,
    DomainDeletePopupComponent,
    DomainDetailComponent,
    DomainDialogComponent,
    DomainPopupComponent,
    domainPopupRoute,
    DomainPopupService,
    domainRoute,
    DomainService
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
