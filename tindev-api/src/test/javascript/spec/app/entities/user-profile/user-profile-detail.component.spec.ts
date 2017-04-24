import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils } from 'ng-jhipster';
import { JhiLanguageService } from 'ng-jhipster';
import { MockLanguageService } from '../../../helpers/mock-language.service';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { UserProfileDetailComponent } from '../../../../../../main/webapp/app/entities/user-profile/user-profile-detail.component';
import { UserProfileService } from '../../../../../../main/webapp/app/entities/user-profile/user-profile.service';
import { UserProfile } from '../../../../../../main/webapp/app/entities/user-profile/user-profile.model';

describe('Component Tests', () => {

    describe('UserProfile Management Detail Component', () => {
        let comp: UserProfileDetailComponent;
        let fixture: ComponentFixture<UserProfileDetailComponent>;
        let service: UserProfileService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [UserProfileDetailComponent],
                providers: [
                    MockBackend,
                    BaseRequestOptions,
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    {
                        provide: Http,
                        useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
                            return new Http(backendInstance, defaultOptions);
                        },
                        deps: [MockBackend, BaseRequestOptions]
                    },
                    {
                        provide: JhiLanguageService,
                        useClass: MockLanguageService
                    },
                    UserProfileService
                ]
            }).overrideComponent(UserProfileDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserProfileDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserProfileService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new UserProfile(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.userProfile).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
