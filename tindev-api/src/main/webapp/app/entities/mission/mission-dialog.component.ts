import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Mission } from './mission.model';
import { MissionPopupService } from './mission-popup.service';
import { MissionService } from './mission.service';
import { Recruiter, RecruiterService } from '../recruiter';
import { Specialty, SpecialtyService } from '../specialty';
import { Domain, DomainService } from '../domain';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-mission-dialog',
    templateUrl: './mission-dialog.component.html'
})
export class MissionDialogComponent implements OnInit {

    mission: Mission;
    authorities: any[];
    isSaving: boolean;

    recruiters: Recruiter[];

    specialties: Specialty[];

    domains: Domain[];
    startDateDp: any;
    endDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private missionService: MissionService,
        private recruiterService: RecruiterService,
        private specialtyService: SpecialtyService,
        private domainService: DomainService,
        private eventManager: EventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.recruiterService.query()
            .subscribe((res: ResponseWrapper) => { this.recruiters = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.specialtyService.query()
            .subscribe((res: ResponseWrapper) => { this.specialties = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.domainService.query()
            .subscribe((res: ResponseWrapper) => { this.domains = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.mission.id !== undefined) {
            this.subscribeToSaveResponse(
                this.missionService.update(this.mission), false);
        } else {
            this.subscribeToSaveResponse(
                this.missionService.create(this.mission), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Mission>, isCreated: boolean) {
        result.subscribe((res: Mission) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Mission, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'tindevApp.mission.created'
            : 'tindevApp.mission.updated',
            { param : result.id }, null);

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

    trackRecruiterById(index: number, item: Recruiter) {
        return item.id;
    }

    trackSpecialtyById(index: number, item: Specialty) {
        return item.id;
    }

    trackDomainById(index: number, item: Domain) {
        return item.id;
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
