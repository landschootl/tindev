import { AfterViewInit, Component, ElementRef, OnInit, Renderer } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EventManager, JhiLanguageService } from 'ng-jhipster';
import { Register } from './register.service';
import { Router } from '@angular/router';
import { LoginModalService } from '../../shared/login/login-modal.service';
import { LoginService } from '../../shared/login/login.service';

@Component({
    selector: 'jhi-register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit, AfterViewInit {

    confirmPassword: string;
    doNotMatch: string;
    error: string;
    errorEmailExists: string;
    errorUserExists: string;
    registerAccount: any;
    success: boolean;
    modalRef: NgbModalRef;

    constructor(
        private languageService: JhiLanguageService,
        private loginModalService: LoginModalService,
        private eventManager: EventManager,
        private loginService: LoginService,
        private router: Router,
        private registerService: Register,
        private elementRef: ElementRef,
        private renderer: Renderer
    ) {
        this.languageService.setLocations(['register']);
    }

    ngOnInit() {
        this.success = false;
        this.registerAccount = {};
        this.registerAccount.authorities = ['ROLE_FREELANCE'];
    }

    ngAfterViewInit() {
        this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#login'), 'focus', []);
    }

    changeProfile(profile: string): void {
        this.registerAccount.authorities = [profile];
    }

    register() {
        if (this.registerAccount.password !== this.confirmPassword) {
            this.doNotMatch = 'ERROR';
        } else {
            this.doNotMatch = null;
            this.error = null;
            this.errorUserExists = null;
            this.errorEmailExists = null;
            this.languageService.getCurrent().then((key) => {
                this.registerAccount.langKey = key;

                this.registerService.save(this.registerAccount).subscribe(() => {
                    this.success = true;

                    this.loginService.login({
                        username: this.registerAccount.login,
                        password: this.registerAccount.password,
                        rememberMe: false
                    }).then(() => {
                        this.router.navigate(['']);
                        this.eventManager.broadcast({
                            name: 'authenticationSuccess',
                            content: 'Sending Authentication Success'
                        });
                    });
                }, (response) => this.processError(response));
            });
        }
    }

    openLogin() {
        this.modalRef = this.loginModalService.open();
    }

    private processError(response) {
        this.success = null;
        if (response.status === 400 && response._body === 'login already in use') {
            this.errorUserExists = 'ERROR';
        } else if (response.status === 400 && response._body === 'email address already in use') {
            this.errorEmailExists = 'ERROR';
        } else {
            this.error = 'ERROR';
        }
    }
}
