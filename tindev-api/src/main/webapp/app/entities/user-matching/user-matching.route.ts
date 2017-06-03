import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { UserMatchingComponent } from './user-matching.component';
import { UserMatchingDetailComponent } from './user-matching-detail.component';
import { UserMatchingPopupComponent } from './user-matching-dialog.component';
import { UserMatchingDeletePopupComponent } from './user-matching-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class UserMatchingResolvePagingParams implements Resolve<any> {

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

export const userMatchingRoute: Routes = [
    {
        path: 'user-matching',
        component: UserMatchingComponent,
        resolve: {
            'pagingParams': UserMatchingResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tindevApp.userMatching.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'user-matching/:id',
        component: UserMatchingDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tindevApp.userMatching.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const userMatchingPopupRoute: Routes = [
    {
        path: 'user-matching-new',
        component: UserMatchingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tindevApp.userMatching.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-matching/:id/edit',
        component: UserMatchingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tindevApp.userMatching.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'user-matching/:id/delete',
        component: UserMatchingDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'tindevApp.userMatching.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
