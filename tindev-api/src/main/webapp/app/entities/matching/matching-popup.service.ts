import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Matching } from './matching.model';
import { MatchingService } from './matching.service';
@Injectable()
export class MatchingPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private matchingService: MatchingService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.matchingService.find(id).subscribe((matching) => {
                if (matching.fLikedDate) {
                    matching.fLikedDate = {
                        year: matching.fLikedDate.getFullYear(),
                        month: matching.fLikedDate.getMonth() + 1,
                        day: matching.fLikedDate.getDate()
                    };
                }
                if (matching.rLikedDate) {
                    matching.rLikedDate = {
                        year: matching.rLikedDate.getFullYear(),
                        month: matching.rLikedDate.getMonth() + 1,
                        day: matching.rLikedDate.getDate()
                    };
                }
                this.matchingModalRef(component, matching);
            });
        } else {
            return this.matchingModalRef(component, new Matching());
        }
    }

    matchingModalRef(component: Component, matching: Matching): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.matching = matching;
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
