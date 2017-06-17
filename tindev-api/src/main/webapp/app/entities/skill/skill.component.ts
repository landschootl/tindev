import { Component, OnDestroy, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Rx';
import { AlertService, EventManager, JhiLanguageService } from 'ng-jhipster';

import { Skill } from './skill.model';
import { SkillService } from './skill.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-skill',
    templateUrl: './skill.component.html'
})
export class SkillComponent implements OnInit, OnDestroy {
skills: Skill[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private skillService: SkillService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal
    ) {
        this.jhiLanguageService.setLocations(['skill']);
    }

    loadAll() {
        this.skillService.query().subscribe(
            (res: Response) => {
                this.skills = res.json();
            },
            (res: Response) => this.onError(res.json())
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
