import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { Recruiter } from './recruiter.model';
import { RecruiterService } from './recruiter.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-recruiter',
    templateUrl: './recruiter.component.html'
})
export class RecruiterComponent implements OnInit, OnDestroy {
recruiters: Recruiter[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private recruiterService: RecruiterService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.recruiterService.query().subscribe(
            (res: ResponseWrapper) => {
                this.recruiters = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRecruiters();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Recruiter) {
        return item.id;
    }
    registerChangeInRecruiters() {
        this.eventSubscriber = this.eventManager.subscribe('recruiterListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
