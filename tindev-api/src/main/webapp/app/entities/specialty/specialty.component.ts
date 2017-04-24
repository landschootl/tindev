import { Component, OnDestroy, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Rx';
import { AlertService, EventManager, JhiLanguageService } from 'ng-jhipster';

import { Specialty } from './specialty.model';
import { SpecialtyService } from './specialty.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-specialty',
    templateUrl: './specialty.component.html'
})
export class SpecialtyComponent implements OnInit, OnDestroy {
specialties: Specialty[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private specialtyService: SpecialtyService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
        this.jhiLanguageService.setLocations(['specialty']);
    }

    loadAll() {
        this.specialtyService.query().subscribe(
            (res: Response) => {
                this.specialties = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSpecialties();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: Specialty) {
        return item.id;
    }



    registerChangeInSpecialties() {
        this.eventSubscriber = this.eventManager.subscribe('specialtyListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
