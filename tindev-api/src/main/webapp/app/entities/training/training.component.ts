import { Component, OnDestroy, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Rx';
import { AlertService, EventManager, JhiLanguageService } from 'ng-jhipster';

import { Training } from './training.model';
import { TrainingService } from './training.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-training',
    templateUrl: './training.component.html'
})
export class TrainingComponent implements OnInit, OnDestroy {
    trainings: Training[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(private jhiLanguageService: JhiLanguageService,
        private trainingService: TrainingService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal) {
        this.jhiLanguageService.setLocations(['training']);
    }

    loadAll() {
        this.trainingService.query().subscribe(
            (res: Response) => {
                this.trainings = res.json();
            },
            (res: Response) => this.onError(res.json())
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
