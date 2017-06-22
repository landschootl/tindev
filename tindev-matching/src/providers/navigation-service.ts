import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams } from '@angular/http';
import { ApiUtils } from '../shared/utils/api';
import { AuthService } from './auth-service';
import 'rxjs/add/operator/toPromise';
import { ToastController } from 'ionic-angular';

@Injectable()
export class NavigationService {
	currentTarget: any = undefined;
	bypass : boolean = false;
}