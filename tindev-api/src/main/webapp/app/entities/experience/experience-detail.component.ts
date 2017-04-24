import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Experience } from './experience.model';
import { ExperienceService } from './experience.service';

@Component({
    selector: 'jhi-experience-detail',
    templateUrl: './experience-detail.component.html'
})
export class ExperienceDetailComponent implements OnInit, OnDestroy {

    experience: Experience;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private experienceService: ExperienceService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['experience']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.experienceService.find(id).subscribe(experience => {
            this.experience = experience;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
