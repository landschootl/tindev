import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { Mission } from './mission.model';
import { MissionService } from './mission.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-mission',
    templateUrl: './mission.component.html'
})
export class MissionComponent implements OnInit, OnDestroy {
missions: Mission[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private missionService: MissionService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.missionService.query().subscribe(
            (res: ResponseWrapper) => {
                this.missions = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMissions();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Mission) {
        return item.id;
    }
    registerChangeInMissions() {
        this.eventSubscriber = this.eventManager.subscribe('missionListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
