import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { FreelanceComponent } from './freelance.component';
import { FreelanceDetailComponent } from './freelance-detail.component';
import { FreelancePopupComponent } from './freelance-dialog.component';
import { FreelanceDeletePopupComponent } from './freelance-delete-dialog.component';

import { Principal } from '../../shared';


export const freelanceRoute: Routes = [
  {
    path: 'freelance',
    component: FreelanceComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.freelance.home.title'
    }
  }, {
    path: 'freelance/:id',
    component: FreelanceDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.freelance.home.title'
    }
  }
];

export const freelancePopupRoute: Routes = [
  {
    path: 'freelance-new',
    component: FreelancePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.freelance.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'freelance/:id/edit',
    component: FreelancePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.freelance.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'freelance/:id/delete',
    component: FreelanceDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.freelance.home.title'
    },
    outlet: 'popup'
  }
];
