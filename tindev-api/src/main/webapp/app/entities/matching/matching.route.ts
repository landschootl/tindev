import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { MatchingComponent } from './matching.component';
import { MatchingDetailComponent } from './matching-detail.component';
import { MatchingPopupComponent } from './matching-dialog.component';
import { MatchingDeletePopupComponent } from './matching-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class MatchingResolvePagingParams implements Resolve<any> {

    constructor(private paginationUtil: PaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
      };
    }
}

export const matchingRoute: Routes = [
    {
        path: 'matching',
        component: MatchingComponent,
        resolve: {
            'pagingParams': MatchingResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tindevApp.matching.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'matching/:id',
        component: MatchingDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tindevApp.matching.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const matchingPopupRoute: Routes = [
    {
        path: 'matching-new',
        component: MatchingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tindevApp.matching.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'matching/:id/edit',
        component: MatchingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tindevApp.matching.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'matching/:id/delete',
        component: MatchingDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tindevApp.matching.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
