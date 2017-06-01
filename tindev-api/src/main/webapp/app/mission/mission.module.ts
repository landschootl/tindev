import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditMissionComponent } from './mission.edit.component';
import { manageMissionRoute } from './mission.route';
import { TindevSharedModule } from '../shared';
const ENTITY_STATES = [
    ...manageMissionRoute
];

@NgModule({
    imports: [
        TindevSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        EditMissionComponent
    ],
    entryComponents: [
        EditMissionComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MissionModule {}
