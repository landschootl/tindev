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
import { MatchingDetailComponent } from '../../../../../../main/webapp/app/entities/matching/matching-detail.component';
import { MatchingService } from '../../../../../../main/webapp/app/entities/matching/matching.service';
import { Matching } from '../../../../../../main/webapp/app/entities/matching/matching.model';

describe('Component Tests', () => {

    describe('Matching Management Detail Component', () => {
        let comp: MatchingDetailComponent;
        let fixture: ComponentFixture<MatchingDetailComponent>;
        let service: MatchingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                declarations: [MatchingDetailComponent],
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
                    MatchingService
                ]
            }).overrideComponent(MatchingDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MatchingDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MatchingService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Matching(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.matching).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
