import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
inspired from https://ionicallyspeaking.com/2016/03/10/global-variables-in-ionic-2/
*/
@Injectable()
export class TindevSession {
	devMode : any;

  constructor() {
    this.devMode = true;
  }

  isDevMode() {
  	return this.devMode;
  }

}
