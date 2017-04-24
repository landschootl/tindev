import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TindevSharedModule } from '../../shared';

import {
    MissionComponent,
    MissionDeleteDialogComponent,
    MissionDeletePopupComponent,
    MissionDetailComponent,
    MissionDialogComponent,
    MissionPopupComponent,
    missionPopupRoute,
    MissionPopupService,
    missionRoute,
    MissionService
} from './';

const ENTITY_STATES = [
    ...missionRoute,
    ...missionPopupRoute,
];

@NgModule({
    imports: [
        TindevSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        MissionComponent,
        MissionDetailComponent,
        MissionDialogComponent,
        MissionDeleteDialogComponent,
        MissionPopupComponent,
        MissionDeletePopupComponent,
    ],
    entryComponents: [
        MissionComponent,
        MissionDialogComponent,
        MissionPopupComponent,
        MissionDeleteDialogComponent,
        MissionDeletePopupComponent,
    ],
    providers: [
        MissionService,
        MissionPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TindevMissionModule {}
