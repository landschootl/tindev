import { Component, OnDestroy, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Rx';
import { AlertService, EventManager, JhiLanguageService } from 'ng-jhipster';

import { UserProfile } from './user-profile.model';
import { UserProfileService } from './user-profile.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-user-profile',
    templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit, OnDestroy {
userProfiles: UserProfile[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private userProfileService: UserProfileService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
        this.jhiLanguageService.setLocations(['userProfile']);
    }

    loadAll() {
        this.userProfileService.query().subscribe(
            (res: Response) => {
                this.userProfiles = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInUserProfiles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: UserProfile) {
        return item.id;
    }

    registerChangeInUserProfiles() {
        this.eventSubscriber = this.eventManager.subscribe('userProfileListModification', (response) => this.loadAll());
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
