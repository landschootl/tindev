import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Training } from './training.model';
import { TrainingPopupService } from './training-popup.service';
import { TrainingService } from './training.service';

@Component({
    selector: 'jhi-training-dialog',
    templateUrl: './training-dialog.component.html'
})
export class TrainingDialogComponent implements OnInit {

    training: Training;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private trainingService: TrainingService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['training']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.training.id !== undefined) {
            this.trainingService.update(this.training)
                .subscribe((res: Training) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.trainingService.create(this.training)
                .subscribe((res: Training) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Training) {
        this.eventManager.broadcast({ name: 'trainingListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError (error) {
        this.isSaving = false;
        this.onError(error);
    }

    private onError (error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-training-popup',
    template: ''
})
export class TrainingPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private trainingPopupService: TrainingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.trainingPopupService
                    .open(TrainingDialogComponent, params['id']);
            } else {
                this.modalRef = this.trainingPopupService
                    .open(TrainingDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
