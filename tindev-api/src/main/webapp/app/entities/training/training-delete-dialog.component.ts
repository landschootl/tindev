import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Training } from './training.model';
import { TrainingPopupService } from './training-popup.service';
import { TrainingService } from './training.service';

@Component({
    selector: 'jhi-training-delete-dialog',
    templateUrl: './training-delete-dialog.component.html'
})
export class TrainingDeleteDialogComponent {

    training: Training;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private trainingService: TrainingService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['training']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.trainingService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'trainingListModification',
                content: 'Deleted an training'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-training-delete-popup',
    template: ''
})
export class TrainingDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private trainingPopupService: TrainingPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.modalRef = this.trainingPopupService
                .open(TrainingDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
