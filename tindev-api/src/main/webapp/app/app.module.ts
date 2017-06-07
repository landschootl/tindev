import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ng2-webstorage';

import { TindevSharedModule, UserRouteAccessService } from './shared';
import { TindevHomeModule } from './home/home.module';
import { TindevAdminModule } from './admin/admin.module';
import { TindevAccountModule } from './account/account.module';
import { TindevEntityModule } from './entities/entity.module';
import { MissionModule } from './mission/mission.module';

import {
    ActiveMenuDirective,
    ErrorComponent,
    FooterComponent,
    JhiMainComponent,
    LayoutRoutingModule,
    NavbarComponent,
    PageRibbonComponent,
    ProfileService
} from './layouts';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';
import { ProfileFreelanceComponent } from './profile-freelance/profile-freelance.component';
import { ProfileRecruiterComponent } from './profile-recruiter/profile-recruiter.component';

@NgModule({
    imports: [
        BrowserModule,
        LayoutRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        TindevSharedModule,
        TindevHomeModule,
        TindevAdminModule,
        TindevAccountModule,
        TindevEntityModule,
        MissionModule
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent,
        ProfileFreelanceComponent,
        ProfileRecruiterComponent,
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class TindevAppModule {}
