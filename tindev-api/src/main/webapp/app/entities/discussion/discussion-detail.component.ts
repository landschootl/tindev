import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Discussion } from './discussion.model';
import { DiscussionService } from './discussion.service';

@Component({
    selector: 'jhi-discussion-detail',
    templateUrl: './discussion-detail.component.html'
})
export class DiscussionDetailComponent implements OnInit, OnDestroy {

    discussion: Discussion;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private discussionService: DiscussionService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['discussion']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.discussionService.find(id).subscribe(discussion => {
            this.discussion = discussion;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
