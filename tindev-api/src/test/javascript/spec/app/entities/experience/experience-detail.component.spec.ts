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
import { ExperienceDetailComponent } from '../../../../../../main/webapp/app/entities/experience/experience-detail.component';
import { ExperienceService } from '../../../../../../main/webapp/app/entities/experience/experience.service';
import { Experience } from '../../../../../../main/webapp/app/entities/experience/experience.model';

describe('Component Tests', () => {

    describe('Experience Management Detail Component', () => {
        let comp: ExperienceDetailComponent;
        let fixture: ComponentFixture<ExperienceDetailComponent>;
        let service: ExperienceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [ExperienceDetailComponent],
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
                    ExperienceService
                ]
            }).overrideComponent(ExperienceDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ExperienceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ExperienceService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Experience(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.experience).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
