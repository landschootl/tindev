import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import { OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { DateUtils, DataUtils, EventManager } from 'ng-jhipster';
import { TindevTestModule } from '../../../test.module';
import { MockActivatedRoute } from '../../../helpers/mock-route.service';
import { UserprofileDetailComponent } from '../../../../../../main/webapp/app/entities/userprofile/userprofile-detail.component';
import { UserprofileService } from '../../../../../../main/webapp/app/entities/userprofile/userprofile.service';
import { Userprofile } from '../../../../../../main/webapp/app/entities/userprofile/userprofile.model';

describe('Component Tests', () => {

    describe('Userprofile Management Detail Component', () => {
        let comp: UserprofileDetailComponent;
        let fixture: ComponentFixture<UserprofileDetailComponent>;
        let service: UserprofileService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TindevTestModule],
                declarations: [UserprofileDetailComponent],
                providers: [
                    DateUtils,
                    DataUtils,
                    DatePipe,
                    {
                        provide: ActivatedRoute,
                        useValue: new MockActivatedRoute({id: 123})
                    },
                    UserprofileService,
                    EventManager
                ]
            }).overrideComponent(UserprofileDetailComponent, {
                set: {
                    template: ''
                }
            }).compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserprofileDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserprofileService);
        });


        describe('OnInit', () => {
            it('Should call load all on init', () => {
            // GIVEN

            spyOn(service, 'find').and.returnValue(Observable.of(new Userprofile(10)));

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.find).toHaveBeenCalledWith(123);
            expect(comp.userprofile).toEqual(jasmine.objectContaining({id:10}));
            });
        });
    });

});
