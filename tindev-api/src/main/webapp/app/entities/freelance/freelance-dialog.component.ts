import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager, JhiLanguageService } from 'ng-jhipster';

import { Freelance } from './freelance.model';
import { FreelancePopupService } from './freelance-popup.service';
import { FreelanceService } from './freelance.service';

@Component({
    selector: 'jhi-freelance-dialog',
    templateUrl: './freelance-dialog.component.html'
})
export class FreelanceDialogComponent implements OnInit {

    freelance: Freelance;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private freelanceService: FreelanceService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['freelance']);
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
        if (this.freelance.id !== undefined) {
            this.freelanceService.update(this.freelance)
                .subscribe((res: Freelance) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.freelanceService.create(this.freelance)
                .subscribe((res: Freelance) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Freelance) {
        this.eventManager.broadcast({ name: 'freelanceListModification', content: 'OK'});
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
    selector: 'jhi-freelance-popup',
    template: ''
})
export class FreelancePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private freelancePopupService: FreelancePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.freelancePopupService
                    .open(FreelanceDialogComponent, params['id']);
            } else {
                this.modalRef = this.freelancePopupService
                    .open(FreelanceDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
