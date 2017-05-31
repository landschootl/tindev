import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { EventManager, ParseLinks, PaginationUtil, JhiLanguageService, AlertService } from 'ng-jhipster';

import { Skill } from './skill.model';
import { SkillService } from './skill.service';
import { ITEMS_PER_PAGE, Principal, ResponseWrapper } from '../../shared';
import { PaginationConfig } from '../../blocks/config/uib-pagination.config';

@Component({
    selector: 'jhi-skill',
    templateUrl: './skill.component.html'
})
export class SkillComponent implements OnInit, OnDestroy {
skills: Skill[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private skillService: SkillService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.skillService.query().subscribe(
            (res: ResponseWrapper) => {
                this.skills = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSkills();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Skill) {
        return item.id;
    }
    registerChangeInSkills() {
        this.eventSubscriber = this.eventManager.subscribe('skillListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}
