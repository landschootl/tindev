import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PaginationUtil } from 'ng-jhipster';

import { DiscussionComponent } from './discussion.component';
import { DiscussionDetailComponent } from './discussion-detail.component';
import { DiscussionPopupComponent } from './discussion-dialog.component';
import { DiscussionDeletePopupComponent } from './discussion-delete-dialog.component';

import { Principal } from '../../shared';


export const discussionRoute: Routes = [
  {
    path: 'discussion',
    component: DiscussionComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.discussion.home.title'
    }
  }, {
    path: 'discussion/:id',
    component: DiscussionDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.discussion.home.title'
    }
  }
];

export const discussionPopupRoute: Routes = [
  {
    path: 'discussion-new',
    component: DiscussionPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.discussion.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'discussion/:id/edit',
    component: DiscussionPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.discussion.home.title'
    },
    outlet: 'popup'
  },
  {
    path: 'discussion/:id/delete',
    component: DiscussionDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'tindevApp.discussion.home.title'
    },
    outlet: 'popup'
  }
];
