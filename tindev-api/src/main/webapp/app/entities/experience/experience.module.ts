import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TindevSharedModule } from '../../shared';
import {
    ExperienceComponent,
    ExperienceDeleteDialogComponent,
    ExperienceDeletePopupComponent,
    ExperienceDetailComponent,
    ExperienceDialogComponent,
    ExperiencePopupComponent,
    experiencePopupRoute,
    ExperiencePopupService,
    experienceRoute,
    ExperienceService
} from './';

const ENTITY_STATES = [
    ...experienceRoute,
    ...experiencePopupRoute,
];

@NgModule({
    imports: [
        TindevSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ExperienceComponent,
        ExperienceDetailComponent,
        ExperienceDialogComponent,
        ExperienceDeleteDialogComponent,
        ExperiencePopupComponent,
        ExperienceDeletePopupComponent,
    ],
    entryComponents: [
        ExperienceComponent,
        ExperienceDialogComponent,
        ExperiencePopupComponent,
        ExperienceDeleteDialogComponent,
        ExperienceDeletePopupComponent,
    ],
    providers: [
        ExperienceService,
        ExperiencePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TindevExperienceModule {}
