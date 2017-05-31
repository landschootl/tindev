import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Experience } from './experience.model';
import { ExperiencePopupService } from './experience-popup.service';
import { ExperienceService } from './experience.service';
import { Freelance, FreelanceService } from '../freelance';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-experience-dialog',
    templateUrl: './experience-dialog.component.html'
})
export class ExperienceDialogComponent implements OnInit {

    experience: Experience;
    authorities: any[];
    isSaving: boolean;

    freelances: Freelance[];
    startYearDp: any;
    endYearDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private experienceService: ExperienceService,
        private freelanceService: FreelanceService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.freelanceService.query()
            .subscribe((res: ResponseWrapper) => { this.freelances = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.experience.id !== undefined) {
            this.subscribeToSaveResponse(
                this.experienceService.update(this.experience), false);
        } else {
            this.subscribeToSaveResponse(
                this.experienceService.create(this.experience), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Experience>, isCreated: boolean) {
        result.subscribe((res: Experience) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Experience, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'tindevApp.experience.created'
            : 'tindevApp.experience.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'experienceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }

    trackFreelanceById(index: number, item: Freelance) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-experience-popup',
    template: ''
})
export class ExperiencePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private experiencePopupService: ExperiencePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.experiencePopupService
                    .open(ExperienceDialogComponent, params['id']);
            } else {
                this.modalRef = this.experiencePopupService
                    .open(ExperienceDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
