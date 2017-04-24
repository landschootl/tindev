import { Component, OnDestroy, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Rx';
import { AlertService, EventManager, JhiLanguageService } from 'ng-jhipster';

import { Message } from './message.model';
import { MessageService } from './message.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-message',
    templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit, OnDestroy {
messages: Message[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private messageService: MessageService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
        this.jhiLanguageService.setLocations(['message']);
    }

    loadAll () {
        this.messageService.query().subscribe(
            (res: Response) => {
                this.messages = res.json();
            },
            (res: Response) => this.onError(res.json())
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMessages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId (index: number, item: Message) {
        return item.id;
    }

    registerChangeInMessages() {
        this.eventSubscriber = this.eventManager.subscribe('messageListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
