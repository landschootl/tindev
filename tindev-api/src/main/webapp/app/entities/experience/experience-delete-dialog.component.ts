import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Experience } from './experience.model';
import { ExperiencePopupService } from './experience-popup.service';
import { ExperienceService } from './experience.service';

@Component({
    selector: 'jhi-experience-delete-dialog',
    templateUrl: './experience-delete-dialog.component.html'
})
export class ExperienceDeleteDialogComponent {

    experience: Experience;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private experienceService: ExperienceService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['experience']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.experienceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'experienceListModification',
                content: 'Deleted an experience'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-experience-delete-popup',
    template: ''
})
export class ExperienceDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private experiencePopupService: ExperiencePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.experiencePopupService
                .open(ExperienceDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
