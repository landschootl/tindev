import { Component, OnDestroy, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Rx';
import { AlertService, EventManager, JhiLanguageService } from 'ng-jhipster';

import { Freelance } from './freelance.model';
import { FreelanceService } from './freelance.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-freelance',
    templateUrl: './freelance.component.html'
})
export class FreelanceComponent implements OnInit, OnDestroy {
freelances: Freelance[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private freelanceService: FreelanceService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
        this.jhiLanguageService.setLocations(['freelance']);
    }

    loadAll() {
        this.freelanceService.query().subscribe(
            (res: Response) => {
                this.freelances = res.json();
            },
            (res: Response) => this.onError(res.json())
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

    trackId (index: number, item: Freelance) {
        return item.id;
    }

    registerChangeInFreelances() {
        this.eventSubscriber = this.eventManager.subscribe('freelanceListModification', (response) => this.loadAll());
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
