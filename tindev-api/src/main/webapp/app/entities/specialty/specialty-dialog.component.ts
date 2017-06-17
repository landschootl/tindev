import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager, JhiLanguageService } from 'ng-jhipster';

import { Specialty } from './specialty.model';
import { SpecialtyPopupService } from './specialty-popup.service';
import { SpecialtyService } from './specialty.service';

@Component({
    selector: 'jhi-specialty-dialog',
    templateUrl: './specialty-dialog.component.html'
})
export class SpecialtyDialogComponent implements OnInit {

    specialty: Specialty;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private specialtyService: SpecialtyService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['specialty']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.specialty.id !== undefined) {
            this.specialtyService.update(this.specialty)
                .subscribe((res: Specialty) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.specialtyService.create(this.specialty)
                .subscribe((res: Specialty) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: Specialty) {
        this.eventManager.broadcast({ name: 'specialtyListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-specialty-popup',
    template: ''
})
export class SpecialtyPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private specialtyPopupService: SpecialtyPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.specialtyPopupService
                    .open(SpecialtyDialogComponent, params['id']);
            } else {
                this.modalRef = this.specialtyPopupService
                    .open(SpecialtyDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
