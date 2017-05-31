import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, AlertService } from 'ng-jhipster';

import { Skill } from './skill.model';
import { SkillPopupService } from './skill-popup.service';
import { SkillService } from './skill.service';
import { Freelance, FreelanceService } from '../freelance';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-skill-dialog',
    templateUrl: './skill-dialog.component.html'
})
export class SkillDialogComponent implements OnInit {

    skill: Skill;
    authorities: any[];
    isSaving: boolean;

    freelances: Freelance[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: AlertService,
        private skillService: SkillService,
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
        if (this.skill.id !== undefined) {
            this.subscribeToSaveResponse(
                this.skillService.update(this.skill), false);
        } else {
            this.subscribeToSaveResponse(
                this.skillService.create(this.skill), true);
        }
    }

    private subscribeToSaveResponse(result: Observable<Skill>, isCreated: boolean) {
        result.subscribe((res: Skill) =>
            this.onSaveSuccess(res, isCreated), (res: Response) => this.onSaveError(res));
    }

    private onSaveSuccess(result: Skill, isCreated: boolean) {
        this.alertService.success(
            isCreated ? 'tindevApp.skill.created'
            : 'tindevApp.skill.updated',
            { param : result.id }, null);

        this.eventManager.broadcast({ name: 'skillListModification', content: 'OK'});
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
    selector: 'jhi-skill-popup',
    template: ''
})
export class SkillPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private skillPopupService: SkillPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modalRef = this.skillPopupService
                    .open(SkillDialogComponent, params['id']);
            } else {
                this.modalRef = this.skillPopupService
                    .open(SkillDialogComponent);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
