import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TindevSharedModule } from '../../shared';

import {
    SkillComponent,
    SkillDeleteDialogComponent,
    SkillDeletePopupComponent,
    SkillDetailComponent,
    SkillDialogComponent,
    SkillPopupComponent,
    skillPopupRoute,
    SkillPopupService,
    skillRoute,
    SkillService
} from './';

const ENTITY_STATES = [
    ...skillRoute,
    ...skillPopupRoute,
];

@NgModule({
    imports: [
        TindevSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        SkillComponent,
        SkillDetailComponent,
        SkillDialogComponent,
        SkillDeleteDialogComponent,
        SkillPopupComponent,
        SkillDeletePopupComponent,
    ],
    entryComponents: [
        SkillComponent,
        SkillDialogComponent,
        SkillPopupComponent,
        SkillDeleteDialogComponent,
        SkillDeletePopupComponent,
    ],
    providers: [
        SkillService,
        SkillPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TindevSkillModule {}
