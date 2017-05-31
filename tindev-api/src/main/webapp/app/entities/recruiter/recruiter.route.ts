import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { RecruiterComponent } from './recruiter.component';
import { RecruiterDetailComponent } from './recruiter-detail.component';
import { RecruiterPopupComponent } from './recruiter-dialog.component';
import { RecruiterDeletePopupComponent } from './recruiter-delete-dialog.component';

import { Principal } from '../../shared';

export const recruiterRoute: Routes = [
    {
        path: 'recruiter',
        component: RecruiterComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tindevApp.recruiter.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'recruiter/:id',
        component: RecruiterDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tindevApp.recruiter.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const recruiterPopupRoute: Routes = [
    {
        path: 'recruiter-new',
        component: RecruiterPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tindevApp.recruiter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'recruiter/:id/edit',
        component: RecruiterPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tindevApp.recruiter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'recruiter/:id/delete',
        component: RecruiterDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tindevApp.recruiter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
