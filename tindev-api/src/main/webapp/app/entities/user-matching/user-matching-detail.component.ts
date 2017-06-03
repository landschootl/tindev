import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager  } from 'ng-jhipster';

import { UserMatching } from './user-matching.model';
import { UserMatchingService } from './user-matching.service';

@Component({
    selector: 'jhi-user-matching-detail',
    templateUrl: './user-matching-detail.component.html'
})
export class UserMatchingDetailComponent implements OnInit, OnDestroy {

    userMatching: UserMatching;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: EventManager,
        private userMatchingService: UserMatchingService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUserMatchings();
    }

    load(id) {
        this.userMatchingService.find(id).subscribe((userMatching) => {
            this.userMatching = userMatching;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUserMatchings() {
        this.eventSubscriber = this.eventManager.subscribe(
            'userMatchingListModification',
            (response) => this.load(this.userMatching.id)
        );
    }
}
