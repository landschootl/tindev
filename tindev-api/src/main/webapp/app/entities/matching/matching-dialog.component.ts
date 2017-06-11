import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService, JhiLanguageService } from 'ng-jhipster';

import { Matching } from './matching.model';
import { MatchingPopupService } from './matching-popup.service';
import { MatchingService } from './matching.service';
import { Mission, MissionService } from '../mission';
import { Freelance, FreelanceService } from '../freelance';

@Component({
    selector: 'jhi-matching-dialog',
    templateUrl: './matching-dialog.component.html'
})
export class MatchingDialogComponent implements OnInit {

    matching: Matching;
    authorities: any[];
    isSaving: boolean;

    missions: Mission[];

    freelances: Freelance[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: AlertService,
        private matchingService: MatchingService,
        private missionService: MissionService,
        private freelanceService: FreelanceService,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['matching']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.missionService.query().subscribe(
            (res: Response) => { this.missions = res.json(); }, (res: Response) => this.onError(res.json()));
        this.freelanceService.query().subscribe(
            (res: Response) => { this.freelances = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear () {
        this.activeModal.dismiss('cancel');
    }

    save () {
        this.isSaving = true;
        if (this.matching.id !== undefined) {
            this.matchingService.update(this.matching)
                .subscribe((res: Matching) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        } else {
            this.matchingService.create(this.matching)
                .subscribe((res: Matching) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res.json()));
        }
    }

    private onSaveSuccess (result: Matching) {
        this.eventManager.broadcast({ name: 'matchingListModification', content: 'OK'});
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

    trackMissionById(index: number, item: Mission) {
        return item.id;
    }

    trackFreelanceById(index: number, item: Freelance) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-matching-popup',
    template: ''
})
export class MatchingPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private matchingPopupService: MatchingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if ( params['id'] ) {
                this.modalRef = this.matchingPopupService
                    .open(MatchingDialogComponent, params['id']);
            } else {
                this.modalRef = this.matchingPopupService
                    .open(MatchingDialogComponent);
            }

        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
