import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MatchingPage } from '../pages/matching/matching';
import { RegisterPage } from '../pages/register/register';
import { SwingModule } from 'angular2-swing';
import { HttpModule } from '@angular/http';
import { MatchesListPage } from '../pages/matches-list/matches-list';
import { ConversationPage } from '../pages/conversation/conversation';
import { CapitalizePipe } from '../shared/pipes/capitalize.pipe';
import { TindevSession } from '../providers/tindev-session';
import { AuthService } from '../providers/auth-service';
import { Storage } from '@ionic/storage';
import { ApiUtils } from '../shared/utils/api';
import { ConversationService } from '../providers/conversation-service';
import { UserService } from '../providers/user-service';
import { MissionService } from '../providers/mission-service';
import { RecruitersMissionSelectionPage } from '../pages/recruiters-mission-selection/recruiters-mission-selection';
import { MatchingService } from '../providers/matching-service';
import { NavigationService } from '../providers/navigation-service';
import {ProfileDetailsPage} from "../pages/profile-details/profile-details";
import {FreelanceService} from "../providers/freelance-service";
import {RecruiterService} from "../providers/recruiter-service";

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        MatchingPage,
        RegisterPage,
        MatchesListPage,
        ConversationPage,
        CapitalizePipe,
        RecruitersMissionSelectionPage,
        ProfileDetailsPage
    ],
    imports: [
        IonicModule.forRoot(MyApp),
        SwingModule,
        HttpModule
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        MatchingPage,
        ConversationPage,
        MatchesListPage,
        RegisterPage,
        RecruitersMissionSelectionPage,
        ProfileDetailsPage
    ],
    providers: [
        {
            provide: ErrorHandler,
            useClass: IonicErrorHandler
        },
        TindevSession,
        AuthService,
        MatchingService,
        Storage,
        ApiUtils,
        ConversationService,
        UserService,
        NavigationService,
        MissionService,
        FreelanceService,
        RecruiterService
    ]
})
export class AppModule {
}
