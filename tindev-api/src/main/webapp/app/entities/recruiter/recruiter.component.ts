import { Component, OnDestroy, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Rx';
import { AlertService, EventManager, JhiLanguageService } from 'ng-jhipster';

import { Recruiter } from './recruiter.model';
import { RecruiterService } from './recruiter.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-recruiter',
    templateUrl: './recruiter.component.html'
})
export class RecruiterComponent implements OnInit, OnDestroy {
recruiters: Recruiter[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private recruiterService: RecruiterService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
        this.jhiLanguageService.setLocations(['recruiter']);
    }

    loadAll() {
        this.recruiterService.query().subscribe(
            (res: Response) => {
                this.recruiters = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRecruiters();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: Recruiter) {
        return item.id;
    }



    registerChangeInRecruiters() {
        this.eventSubscriber = this.eventManager.subscribe('recruiterListModification', (response) => this.loadAll());
    }


    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}
