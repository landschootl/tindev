import { Component, OnInit } from '@angular/core';
import { JhiLanguageService } from 'ng-jhipster';
import { AccountService, JhiLanguageHelper, Principal } from '../../shared';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { UserProfile } from '../../entities/user-profile/user-profile.model';
import { UserProfileService } from '../../entities/user-profile/user-profile.service';
import {ToasterService, ToasterConfig} from "angular2-toaster/angular2-toaster";

@Component({
    selector: 'jhi-settings',
    templateUrl: './settings.component.html',
    styleUrls: [
        'settings.scss'
    ],
    providers: [NgbTabsetConfig]
})
export class SettingsComponent implements OnInit {
    error: string;
    success: string;
    settingsAccount: any;
    userProfile: UserProfile;
    languages: any[];
    profileUrl = 'http://www.iconsfind.com/wp-content/uploads/2016/10/20161014_58006bf6e7079.png';
    coverUrl = 'http://dsi.u-clermont1.fr/wp-content/uploads/2015/08/WiFi.jpg';

    public configToaster : ToasterConfig = new ToasterConfig({
        positionClass: 'toast-top-right'
    });

    constructor(private account: AccountService,
        private principal: Principal,
        private languageService: JhiLanguageService,
        private userProfileService: UserProfileService,
        private languageHelper: JhiLanguageHelper,
        private config: NgbTabsetConfig,
        private toasterService: ToasterService) {
        this.languageService.setLocations(['settings']);
    }

    ngOnInit() {
        this.principal.identity().then((account) => {
            this.settingsAccount = this.copyAccount(account);
            this.loadUserProfile(account.id);
        });
        this.languageHelper.getAll().then((languages) => {
            this.languages = languages;
        });
    }

    loadUserProfile(id: any) {
        this.userProfileService.find(id).subscribe(userProfile => {
            this.userProfile = userProfile;
        });
    }

    save() {
        this.account.save(this.settingsAccount).subscribe(() => {
            this.error = null;
            this.success = 'OK';
            this.toasterService.pop('success', 'Informations du compte', 'sauvegardés avec succès');
            this.principal.identity(true).then((account) => {
                this.settingsAccount = this.copyAccount(account);
            });
            this.languageService.getCurrent().then((current) => {
                if (this.settingsAccount.langKey !== current) {
                    this.languageService.changeLanguage(this.settingsAccount.langKey);
                }
            });
        }, () => {
            this.success = null;
            this.error = 'ERROR';
            this.toasterService.pop('error', 'Informations du compte', 'problème lors de la savegarde');
        });
    }

    copyAccount(account) {
        return {
            id: account.id,
            activated: account.activated,
            email: account.email,
            firstName: account.firstName,
            langKey: account.langKey,
            lastName: account.lastName,
            login: account.login,
            imageUrl: account.imageUrl,
            authorities: account.authorities
        };
    }
}
