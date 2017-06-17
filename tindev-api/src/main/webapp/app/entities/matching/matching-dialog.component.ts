import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AlertService, EventManager } from 'ng-jhipster';

import { Matching } from './matching.model';
import { MatchingPopupService } from './matching-popup.service';
import { MatchingService } from './matching.service';
import { Mission, MissionService } from '../mission';
import { Freelance, FreelanceService } from '../freelance';
import { ResponseWrapper } from '../../shared';

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
    fLikedDateDp: any;
    rLikedDateDp: any;

    constructor(public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private matchingService: MatchingService,
        private missionService: MissionService,
        private freelanceService: FreelanceService,
        private eventManager: EventManager) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.missionService.query()
            .subscribe((res: ResponseWrapper) => {
                this.missions = res.json;
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.freelanceService.query()
            .subscribe((res: ResponseWrapper) => {
                this.freelances = res.json;
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.matching.id !== undefined) {
            this.subscribeToSaveResponse(
                this.matchingService.update(this.matching), false);
        } else {
            this.subscribeToSaveResponse(
                this.matchingService.create(this.matching), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Matching>, isCreated: boolean) {
        result.subscribe((res: Matching) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Matching, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'tindevApp.matching.created'
                : 'tindevApp.matching.updated',
            { param: result.id }, null);

        this.eventManager.broadcast({ name: 'matchingListModification', content: 'OK' });
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

    constructor(private route: ActivatedRoute,
        private matchingPopupService: MatchingPopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if (params['id']) {
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
