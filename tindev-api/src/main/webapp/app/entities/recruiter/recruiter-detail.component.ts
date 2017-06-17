import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Recruiter } from './recruiter.model';
import { RecruiterService } from './recruiter.service';

@Component({
    selector: 'jhi-recruiter-detail',
    templateUrl: './recruiter-detail.component.html'
})
export class RecruiterDetailComponent implements OnInit, OnDestroy {

    recruiter: Recruiter;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private jhiLanguageService: JhiLanguageService,
        private recruiterService: RecruiterService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['recruiter']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRecruiters();
    }

    load(id) {
        this.recruiterService.find(id).subscribe((recruiter) => {
            this.recruiter = recruiter;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRecruiters() {
        this.eventSubscriber = this.eventManager.subscribe('recruiterListModification', (response) => this.load(this.recruiter.id));
    }
}
