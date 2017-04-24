import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { Message } from './message.model';
import { MessageService } from './message.service';

@Component({
    selector: 'jhi-message-detail',
    templateUrl: './message-detail.component.html'
})
export class MessageDetailComponent implements OnInit, OnDestroy {

    message: Message;
    private subscription: any;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private messageService: MessageService,
        private route: ActivatedRoute
    ) {
        this.jhiLanguageService.setLocations(['message']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
    }

    load (id) {
        this.messageService.find(id).subscribe(message => {
            this.message = message;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}
