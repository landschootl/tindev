import { Component, OnInit } from '@angular/core';
import { AlertService, EventManager, JhiLanguageService } from 'ng-jhipster';
import { MissionService } from '../entities/mission/mission.service';
import { Principal } from '../shared';

@Component({
    selector: 'jhi-mission',
    templateUrl: './mission.edit.component.html',
    styles: []
})
export class EditMissionComponent implements OnInit {

    constructor(private jhiLanguageService: JhiLanguageService,
        private missionService: MissionService,
        private alertService: AlertService,
        private eventManager: EventManager,
        private principal: Principal) {
        debugger;
        this.jhiLanguageService.setLocations(['editmission']);
    }

    ngOnInit() {
    }

}
