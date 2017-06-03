import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { UserMatching } from './user-matching.model';
import { UserMatchingService } from './user-matching.service';
@Injectable()
export class UserMatchingPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private userMatchingService: UserMatchingService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.userMatchingService.find(id).subscribe((userMatching) => {
                this.userMatchingModalRef(component, userMatching);
            });
        } else {
            return this.userMatchingModalRef(component, new UserMatching());
        }
    }

    userMatchingModalRef(component: Component, userMatching: UserMatching): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.userMatching = userMatching;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.isOpen = false;
        });
        return modalRef;
    }
}
