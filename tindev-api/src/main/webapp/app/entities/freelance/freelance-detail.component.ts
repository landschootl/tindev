import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { Freelance } from './freelance.model';
import { FreelanceService } from './freelance.service';

@Component({
    selector: 'jhi-freelance-detail',
    templateUrl: './freelance-detail.component.html'
})
export class FreelanceDetailComponent implements OnInit, OnDestroy {

    freelance: Freelance;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private freelanceService: FreelanceService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFreelances();
    }

    load(id) {
        this.freelanceService.find(id).subscribe((freelance) => {
            this.freelance = freelance;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFreelances() {
        this.eventSubscriber = this.eventManager.subscribe(
            'freelanceListModification',
            (response) => this.load(this.freelance.id)
        );
    }
}
