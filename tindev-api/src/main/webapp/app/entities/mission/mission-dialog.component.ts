import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Mission } from './mission.model';
import { MissionPopupService } from './mission-popup.service';
import { MissionService } from './mission.service';

@Component({
    selector: 'jhi-mission-dialog',
    templateUrl: './mission-dialog.component.html'
})
export class MissionDialogComponent implements OnInit {

    mission: Mission;
    authorities: any[];
    isSaving: boolean;
            constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private missionService: MissionService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['mission']);
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
        if (this.mission.id !== undefined) {
            this.missionService.update(this.mission)
                .subscribe((res: Mission) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.missionService.create(this.mission)
                .subscribe((res: Mission) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: Mission) {
        this.eventManager.broadcast({ name: 'missionListModification', content: 'OK'});
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
    selector: 'jhi-mission-popup',
    template: ''
})
export class MissionPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private missionPopupService: MissionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.missionPopupService
                    .open(MissionDialogComponent, params['id']);
            } else {
                this.modalRef = this.missionPopupService
                    .open(MissionDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
