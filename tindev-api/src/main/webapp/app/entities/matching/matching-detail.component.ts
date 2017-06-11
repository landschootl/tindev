import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Matching } from './matching.model';
import { MatchingService } from './matching.service';

@Component({
    selector: 'jhi-matching-detail',
    templateUrl: './matching-detail.component.html'
})
export class MatchingDetailComponent implements OnInit, OnDestroy {

    matching: Matching;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private matchingService: MatchingService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['matching']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.matchingService.find(id).subscribe(matching => {
            this.matching = matching;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
