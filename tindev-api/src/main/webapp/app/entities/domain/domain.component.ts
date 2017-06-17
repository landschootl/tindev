import { Component, OnDestroy, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Rx';
import { AlertService, EventManager, JhiLanguageService } from 'ng-jhipster';

import { Domain } from './domain.model';
import { DomainService } from './domain.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-domain',
    templateUrl: './domain.component.html'
})
export class DomainComponent implements OnInit, OnDestroy {
domains: Domain[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private domainService: DomainService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
        this.jhiLanguageService.setLocations(['domain']);
    }

    loadAll() {
        this.domainService.query().subscribe(
            (res: Response) => {
                this.domains = res.json();
            },
            (res: Response) => this.onError(res.json())
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
