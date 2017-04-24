import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Training } from './training.model';
import { TrainingService } from './training.service';

@Component({
    selector: 'jhi-training-detail',
    templateUrl: './training-detail.component.html'
})
export class TrainingDetailComponent implements OnInit, OnDestroy {

    training: Training;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private trainingService: TrainingService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['training']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.trainingService.find(id).subscribe(training => {
            this.training = training;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
