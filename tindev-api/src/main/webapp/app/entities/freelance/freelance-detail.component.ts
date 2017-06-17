import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Freelance } from './freelance.model';
import { FreelanceService } from './freelance.service';

@Component({
    selector: 'jhi-freelance-detail',
    templateUrl: './freelance-detail.component.html'
})
export class FreelanceDetailComponent implements OnInit, OnDestroy {

    freelance: Freelance;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private freelanceService: FreelanceService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['freelance']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.freelanceService.find(id).subscribe(freelance => {
            this.freelance = freelance;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
