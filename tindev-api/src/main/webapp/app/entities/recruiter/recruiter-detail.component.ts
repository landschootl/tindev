import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Recruiter } from './recruiter.model';
import { RecruiterService } from './recruiter.service';

@Component({
    selector: 'jhi-recruiter-detail',
    templateUrl: './recruiter-detail.component.html'
})
export class RecruiterDetailComponent implements OnInit, OnDestroy {

    recruiter: Recruiter;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private recruiterService: RecruiterService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['recruiter']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.recruiterService.find(id).subscribe(recruiter => {
            this.recruiter = recruiter;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
