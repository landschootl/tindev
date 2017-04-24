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
import { FreelanceDetailComponent } from '../../../../../../main/webapp/app/entities/freelance/freelance-detail.component';
import { FreelanceService } from '../../../../../../main/webapp/app/entities/freelance/freelance.service';
import { Freelance } from '../../../../../../main/webapp/app/entities/freelance/freelance.model';

describe('Component Tests', () => {

    describe('Freelance Management Detail Component', () => {
        let comp: FreelanceDetailComponent;
        let fixture: ComponentFixture<FreelanceDetailComponent>;
        let service: FreelanceService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [FreelanceDetailComponent],
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
                    FreelanceService
                ]
            }).overrideComponent(FreelanceDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FreelanceDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FreelanceService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Freelance(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.freelance).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
