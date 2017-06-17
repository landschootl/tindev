import { Component, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Recruiter } from './recruiter.model';
import { RecruiterService } from './recruiter.service';
@Injectable()
export class RecruiterPopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private recruiterService: RecruiterService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.recruiterService.find(id).subscribe((recruiter) => {
                this.recruiterModalRef(component, recruiter);
            });
        } else {
            return this.recruiterModalRef(component, new Recruiter());
        }
    }

    recruiterModalRef(component: Component, recruiter: Recruiter): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.recruiter = recruiter;
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
