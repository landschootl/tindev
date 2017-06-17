import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager } from 'ng-jhipster';

import { Matching } from './matching.model';
import { MatchingService } from './matching.service';

@Component({
    selector: 'jhi-matching-detail',
    templateUrl: './matching-detail.component.html'
})
export class MatchingDetailComponent implements OnInit, OnDestroy {

    matching: Matching;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: EventManager,
        private matchingService: MatchingService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMatchings();
    }

    load(id) {
        this.matchingService.find(id).subscribe((matching) => {
            this.matching = matching;
        });
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMatchings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'matchingListModification',
            (response) => this.load(this.matching.id)
        );
    }
}
