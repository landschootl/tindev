import { Component, OnDestroy, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Rx';
import { AlertService, EventManager, JhiLanguageService } from 'ng-jhipster';

import { Experience } from './experience.model';
import { ExperienceService } from './experience.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-experience',
    templateUrl: './experience.component.html'
})
export class ExperienceComponent implements OnInit, OnDestroy {
experiences: Experience[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private experienceService: ExperienceService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
        this.jhiLanguageService.setLocations(['experience']);
    }

    loadAll() {
        this.experienceService.query().subscribe(
            (res: Response) => {
                this.experiences = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInExperiences();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Experience) {
        return item.id;
    }
    registerChangeInExperiences() {
        this.eventSubscriber = this.eventManager.subscribe('experienceListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
