import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { Discussion } from './discussion.model';
import { DiscussionService } from './discussion.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-discussion',
    templateUrl: './discussion.component.html'
})
export class DiscussionComponent implements OnInit, OnDestroy {
discussions: Discussion[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private discussionService: DiscussionService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.discussionService.query().subscribe(
            (res: ResponseWrapper) => {
                this.discussions = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
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

    trackId(index: number, item: Discussion) {
        return item.id;
    }
    registerChangeInDiscussions() {
        this.eventSubscriber = this.eventManager.subscribe('discussionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
