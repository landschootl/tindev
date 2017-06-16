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

    constructor(private jhiLanguageService: JhiLanguageService,
        private freelanceService: FreelanceService,
        private userProfileService: UserProfileService,
        private specialtyService: SpecialtyService,
        private domainService: DomainService,
        private route: ActivatedRoute) {
        this.jhiLanguageService.setLocations(['userProfile']);
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['settingsAccount']) {
            this.load(this.settingsAccount.id);
        }
    }

    ngOnInit(): void {
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
        });
    }

    saveUserProfile() {
        this.userProfileService.update(this.userProfile)
            .subscribe(
                (res: UserProfile) => {

                },
                (res: Response) => {
                    console.log('error => ', res);
                });
    }

    saveFreelanceProfile() {
        this.freelanceService.update(this.freelanceProfile)
            .subscribe(
                (res: Freelance) => {
                    this.freelanceProfile = res;
                },
                (res: Response) => {
                    console.log('error => ', res);
                });
    }

    previousState() {
        window.history.back();
    }
}
