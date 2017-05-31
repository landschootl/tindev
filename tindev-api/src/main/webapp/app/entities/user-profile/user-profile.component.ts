import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { UserProfile } from './user-profile.model';
import { UserProfileService } from './user-profile.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-user-profile',
    templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit, OnDestroy {
userProfiles: UserProfile[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private userProfileService: UserProfileService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.userProfileService.query().subscribe(
            (res: ResponseWrapper) => {
                this.userProfiles = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
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

    trackId(index: number, item: UserProfile) {
        return item.id;
    }
    registerChangeInUserProfiles() {
        this.eventSubscriber = this.eventManager.subscribe('userProfileListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
