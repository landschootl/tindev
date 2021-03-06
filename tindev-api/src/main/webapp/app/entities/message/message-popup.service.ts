import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Message } from './message.model';
import { MessageService } from './message.service';
@Injectable()
export class MessagePopupService {
    private isOpen = false;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private messageService: MessageService

    ) {}

    open(component: Component, id?: number | any): NgbModalRef {
        if (this.isOpen) {
            return;
        }
        this.isOpen = true;

        if (id) {
            this.messageService.find(id).subscribe((message) => {
                if (message.postingDate) {
                    message.postingDate = {
                        year: message.postingDate.getFullYear(),
                        month: message.postingDate.getMonth() + 1,
                        day: message.postingDate.getDate()
                    };
                }
                this.messageModalRef(component, message);
            });
        } else {
            return this.messageModalRef(component, new Message());
        }
    }

    messageModalRef(component: Component, message: Message): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.message = message;
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
