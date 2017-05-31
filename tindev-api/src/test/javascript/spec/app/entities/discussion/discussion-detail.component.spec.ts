import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { TindevTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { DiscussionDetailComponent } from '../../../../../../main/webapp/app/entities/discussion/discussion-detail.component';
import { DiscussionService } from '../../../../../../main/webapp/app/entities/discussion/discussion.service';
import { Discussion } from '../../../../../../main/webapp/app/entities/discussion/discussion.model';

describe('Component Tests', () => {

    describe('Discussion Management Detail Component', () => {
        let comp: DiscussionDetailComponent;
        let fixture: ComponentFixture<DiscussionDetailComponent>;
        let service: DiscussionService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TindevTestModule],
                declarations: [DiscussionDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    DiscussionService,
                    EventManager
                ]
            }).overrideTemplate(DiscussionDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(DiscussionDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(DiscussionService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Discussion(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.discussion).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
