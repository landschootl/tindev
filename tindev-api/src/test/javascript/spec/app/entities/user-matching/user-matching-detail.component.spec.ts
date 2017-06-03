import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { TindevTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { UserMatchingDetailComponent } from '../../../../../../main/webapp/app/entities/user-matching/user-matching-detail.component';
import { UserMatchingService } from '../../../../../../main/webapp/app/entities/user-matching/user-matching.service';
import { UserMatching } from '../../../../../../main/webapp/app/entities/user-matching/user-matching.model';

describe('Component Tests', () => {

    describe('UserMatching Management Detail Component', () => {
        let comp: UserMatchingDetailComponent;
        let fixture: ComponentFixture<UserMatchingDetailComponent>;
        let service: UserMatchingService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TindevTestModule],
                declarations: [UserMatchingDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    UserMatchingService,
                    EventManager
                ]
            }).overrideTemplate(UserMatchingDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserMatchingDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserMatchingService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new UserMatching(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.userMatching).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
