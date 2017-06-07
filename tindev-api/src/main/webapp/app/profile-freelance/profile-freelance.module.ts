import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { profileFreelanceRoute } from './profile-freelance.route';
import { TindevSharedModule } from '../shared';
import {ProfileFreelanceComponent} from "./profile-freelance.component";
const ENTITY_STATES = [
    ...profileFreelanceRoute
];

@NgModule({
    imports: [
        TindevSharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
    ],
    declarations: [
        ProfileFreelanceComponent
    ],
    entryComponents: [
        ProfileFreelanceComponent
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProfileFreelanceModule {}
