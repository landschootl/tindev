import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';

import { Discussion } from './discussion.model';
import { DiscussionPopupService } from './discussion-popup.service';
import { DiscussionService } from './discussion.service';

@Component({
    selector: 'jhi-discussion-delete-dialog',
    templateUrl: './discussion-delete-dialog.component.html'
})
export class DiscussionDeleteDialogComponent {

    discussion: Discussion;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private discussionService: DiscussionService,
        public activeModal: NgbActiveModal,
        private eventManager: EventManager
    ) {
        this.jhiLanguageService.setLocations(['discussion']);
    }

    clear () {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete (id: number) {
        this.discussionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'discussionListModification',
                content: 'Deleted an discussion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-discussion-delete-popup',
    template: ''
})
export class DiscussionDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor (
        private route: ActivatedRoute,
        private discussionPopupService: DiscussionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.modalRef = this.discussionPopupService
                .open(DiscussionDeleteDialogComponent, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
