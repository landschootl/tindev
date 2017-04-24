import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { TrainingComponent } from './training.component';
import { TrainingDetailComponent } from './training-detail.component';
import { TrainingPopupComponent } from './training-dialog.component';
import { TrainingDeletePopupComponent } from './training-delete-dialog.component';

import { Principal } from '../../shared';


export const trainingRoute: Routes = [
  {
    path: 'training',
    component: TrainingComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.training.home.title'
    }
  }, {
    path: 'training/:id',
    component: TrainingDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.training.home.title'
    }
  }
];

export const trainingPopupRoute: Routes = [
  {
    path: 'training-new',
    component: TrainingPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.training.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'training/:id/edit',
    component: TrainingPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.training.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'training/:id/delete',
    component: TrainingDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.training.home.title'
    },
    outlet: 'popup'
  }
];
