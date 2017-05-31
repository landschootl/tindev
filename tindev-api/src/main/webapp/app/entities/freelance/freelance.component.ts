import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { Freelance } from './freelance.model';
import { FreelanceService } from './freelance.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-freelance',
    templateUrl: './freelance.component.html'
})
export class FreelanceComponent implements OnInit, OnDestroy {
freelances: Freelance[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private freelanceService: FreelanceService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.freelanceService.query().subscribe(
            (res: ResponseWrapper) => {
                this.freelances = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFreelances();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Freelance) {
        return item.id;
    }
    registerChangeInFreelances() {
        this.eventSubscriber = this.eventManager.subscribe('freelanceListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
