import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Specialty } from './specialty.model';
import { SpecialtyService } from './specialty.service';

@Component({
    selector: 'jhi-specialty-detail',
    templateUrl: './specialty-detail.component.html'
})
export class SpecialtyDetailComponent implements OnInit, OnDestroy {

    specialty: Specialty;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private specialtyService: SpecialtyService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['specialty']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.specialtyService.find(id).subscribe(specialty => {
            this.specialty = specialty;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
