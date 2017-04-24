import { Component, OnDestroy, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Rx';
import { AlertService, EventManager, JhiLanguageService } from 'ng-jhipster';

import { Discussion } from './discussion.model';
import { DiscussionService } from './discussion.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-discussion',
    templateUrl: './discussion.component.html'
})
export class DiscussionComponent implements OnInit, OnDestroy {
discussions: Discussion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private discussionService: DiscussionService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
        this.jhiLanguageService.setLocations(['discussion']);
    }

    loadAll() {
        this.discussionService.query().subscribe(
            (res: Response) => {
                this.discussions = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDiscussions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: Discussion) {
        return item.id;
    }

    registerChangeInDiscussions() {
        this.eventSubscriber = this.eventManager.subscribe('discussionListModification', (response) => this.loadAll());
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
