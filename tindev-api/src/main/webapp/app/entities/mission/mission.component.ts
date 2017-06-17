import { Component, OnDestroy, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Rx';
import { AlertService, EventManager, JhiLanguageService } from 'ng-jhipster';

import { Mission } from './mission.model';
import { MissionService } from './mission.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-mission',
    templateUrl: './mission.component.html'
})
export class MissionComponent implements OnInit, OnDestroy {
    missions: Mission[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(private jhiLanguageService: JhiLanguageService,
        private missionService: MissionService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal) {
        this.jhiLanguageService.setLocations(['mission']);
    }

    loadAll() {
        this.missionService.query().subscribe(
            (res: Response) => {
                this.missions = res.json();
            },
            (res: Response) => this.onError(res.json())
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
