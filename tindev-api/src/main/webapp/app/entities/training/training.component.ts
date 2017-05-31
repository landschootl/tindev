import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { Training } from './training.model';
import { TrainingService } from './training.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-training',
    templateUrl: './training.component.html'
})
export class TrainingComponent implements OnInit, OnDestroy {
trainings: Training[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private trainingService: TrainingService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.trainingService.query().subscribe(
            (res: ResponseWrapper) => {
                this.trainings = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTrainings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Training) {
        return item.id;
    }
    registerChangeInTrainings() {
        this.eventSubscriber = this.eventManager.subscribe('trainingListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
