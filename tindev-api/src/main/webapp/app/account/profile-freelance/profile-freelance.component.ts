import { Component, Input, OnChanges, OnInit, SimpleChange } from '@angular/core';
import { UserProfile } from '../../entities/user-profile/user-profile.model';
import { JhiLanguageService } from 'ng-jhipster';
import { UserProfileService } from '../../entities/user-profile/user-profile.service';
import { ActivatedRoute } from '@angular/router';
import { FreelanceService } from '../../entities/freelance/freelance.service';
import { Freelance } from '../../entities/freelance/freelance.model';
import { Specialty } from '../../entities/specialty/specialty.model';
import { Domain } from '../../entities/domain/domain.model';
import { SpecialtyService } from '../../entities/specialty/specialty.service';
import { DomainService } from '../../entities/domain/domain.service';
import {ToasterService, ToasterConfig} from "angular2-toaster";
import {Skill} from "../../entities/skill/skill.model";
import {SkillService} from "../../entities/skill/skill.service";

@Component({
    selector: 'jhi-profile-freelance',
    templateUrl: './profile-freelance.component.html',
    styleUrls: [
        'profile-freelance.scss'
    ]
})
export class ProfileFreelanceComponent implements OnInit, OnChanges {
    @Input() settingsAccount: any;
    @Input() userProfile: UserProfile;

    freelanceProfile: Freelance;
    specialties: Specialty[];
    domains: Domain[];

    skills: Skill[];
    newSkill: Skill;

    public configToaster : ToasterConfig = new ToasterConfig({
        positionClass: 'toast-top-right'
    });

    constructor(private jhiLanguageService: JhiLanguageService,
        private freelanceService: FreelanceService,
        private userProfileService: UserProfileService,
        private specialtyService: SpecialtyService,
        private skillService: SkillService,
        private domainService: DomainService,
        private toasterService: ToasterService,
        private route: ActivatedRoute) {
        this.jhiLanguageService.setLocations(['userProfile']);
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['settingsAccount']) {
            this.load(this.settingsAccount.id);
        }
    }

    ngOnInit(): void {
        this.newSkill = new Skill();
        this.specialtyService.query()
            .subscribe(
                (res) => this.specialties = res.json()
            );
        this.domainService.query()
            .subscribe(
                (res) => this.domains = res.json()
            );
    }

    trackSpecialtyById(index: number, item: Specialty) {
        return item.id;
    }

    trackDomainById(index: number, item: Domain) {
        return item.id;
    }

    load(id) {
        this.freelanceService.findByIdUser(id).subscribe(freelanceProfile => {
            this.freelanceProfile = freelanceProfile;
            this.loadSkills(freelanceProfile.id);
            this.newSkill.freelance = freelanceProfile.id;
        });
    }

    loadSkills(idFreelance) {
        this.skillService.findByFreelance(idFreelance).subscribe(
            (res) => {
                this.skills = res.json();
            });
    }

    saveUserProfile() {
        this.userProfileService.update(this.userProfile)
            .subscribe(
                (res: UserProfile) => {
                    this.toasterService.pop('success', 'Informations utilisateur', 'sauvegardés avec succès');
                },
                (res: Response) => {
                    this.toasterService.pop('error', 'Informations utilisateur', res.statusText);
                });
    }

    saveFreelanceProfile() {
        this.freelanceService.update(this.freelanceProfile)
            .subscribe(
                (res: Freelance) => {
                    this.freelanceProfile = res;
                    this.toasterService.pop('success', 'Informations métier', 'sauvegardés avec succès');
                },
                (res: Response) => {
                    this.toasterService.pop('error', 'Informations métier', res.statusText);
                });
    }

    previousState() {
        window.history.back();
    }
}
