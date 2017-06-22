import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TindevSharedModule } from '../../shared';
import {
    MissionService,
    MissionPopupService,
    MissionComponent,
    MissionDetailComponent,
    MissionDialogComponent,
    MissionPopupComponent,
    MissionDeletePopupComponent,
    MissionDeleteDialogComponent,
    missionRoute,
    missionPopupRoute,
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
