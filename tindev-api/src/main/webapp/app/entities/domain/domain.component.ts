import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { Domain } from './domain.model';
import { DomainService } from './domain.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-domain',
    templateUrl: './domain.component.html'
})
export class DomainComponent implements OnInit, OnDestroy {
domains: Domain[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private domainService: DomainService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.domainService.query().subscribe(
            (res: ResponseWrapper) => {
                this.domains = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInDomains();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Domain) {
        return item.id;
    }
    registerChangeInDomains() {
        this.eventSubscriber = this.eventManager.subscribe('domainListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
