import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { ToastController } from 'ionic-angular';


@Component({
  selector: 'recruiters-mission-selection',
  templateUrl: 'recruiters-mission-selection.html'
})
export class RecruitersMissionSelectionPage {
	constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, 
		private toastCtrl : ToastController) {}
  	
}