import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';

import { DomainComponent } from './domain.component';
import { DomainDetailComponent } from './domain-detail.component';
import { DomainPopupComponent } from './domain-dialog.component';
import { DomainDeletePopupComponent } from './domain-delete-dialog.component';

export const domainRoute: Routes = [
  {
    path: 'domain',
    component: DomainComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.domain.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'domain/:id',
    component: DomainDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.domain.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const domainPopupRoute: Routes = [
  {
    path: 'domain-new',
    component: DomainPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.domain.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'domain/:id/edit',
    component: DomainPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.domain.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'domain/:id/delete',
    component: DomainDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.domain.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
