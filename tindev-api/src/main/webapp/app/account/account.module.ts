import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TindevSharedModule } from '../shared';

import {ProfileFreelanceComponent} from "./profile-freelance/profile-freelance.component";
import {ProfileRecruiterComponent} from "./profile-recruiter/profile-recruiter.component";
import {
    accountState,
    Activate,
    ActivateComponent,
    Password,
    PasswordComponent,
    PasswordResetFinish,
    PasswordResetFinishComponent,
    PasswordResetInit,
    PasswordResetInitComponent,
    PasswordStrengthBarComponent,
    Register,
    RegisterComponent,
    SettingsComponent
} from './';

@NgModule({
    imports: [
        TindevSharedModule,
        RouterModule.forRoot(accountState, { useHash: true })
    ],
    declarations: [
        ActivateComponent,
        RegisterComponent,
        PasswordComponent,
        PasswordStrengthBarComponent,
        PasswordResetInitComponent,
        PasswordResetFinishComponent,
        SettingsComponent,
        ProfileFreelanceComponent,
        ProfileRecruiterComponent
    ],
    providers: [
        Register,
        Activate,
        Password,
        PasswordResetInit,
        PasswordResetFinish
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TindevAccountModule {}
