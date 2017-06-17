import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { MissionService } from '../../providers/mission-service';
import { Mission } from '../../shared/models/mission';
import { AuthService } from '../../providers/auth-service';
import { MatchingPage } from '../../pages/matching/matching';


@Component({
  selector: 'recruiters-mission-selection',
  templateUrl: 'recruiters-mission-selection.html'
})
export class RecruitersMissionSelectionPage {
	loading : Loading;
	data : Array<Mission>;
	searchMatchingData : Array<Mission>;
	searchinput : string = '';
	showSearchLoader : boolean = false;
	interval : any;

	constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, 
		private toastCtrl : ToastController, private mission : MissionService, private auth : AuthService) {
	}

	ionViewDidLoad() {
		this.interval = setInterval(() => {
	  		if(this.auth.currentUser.specId != undefined) {
	  			this.initializeItems();
	  		}
	  	}, 500);
  	}

	initializeItems() {
	  	this.showLoading();
	  	this.mission.apiGetMissionsForRecruiter().subscribe(data => {
	      this.data = data;
	      this.searchMatchingData = data;
	    },
	      error => {
	        this.loading.dismiss();
	        this.showToast("Impossible de récupérer vos missions");
	      });
	      clearInterval(this.interval);
	  }

	  public showToast(text) {
	  	let toast = this.toastCtrl.create({
	      message: text,
	      duration: 2000,
	      position: 'bottom',
	      showCloseButton : true,
	      closeButtonText : "Réessayer"
	    });
	    toast.onDidDismiss(() => {
	    	this.initializeItems();
	    });
	    toast.present(toast);
	  }
  	
  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Récupération de vos mission...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  onSearchInput(event) {
    this.showSearchLoader = true;
    this.actualizeItems(this.searchinput);
  }

  actualizeItems(input : string) {
    this.searchMatchingData = [];
    for(let d of this.data) {
      if(d.title.toLowerCase().includes(input.toLowerCase()) 
        || d.description.toLowerCase().includes(input.toLowerCase())) {
        this.searchMatchingData.push(d);
      }
    }
    this.showSearchLoader = false;
  }

  openMatchingPage(m : Mission) {
    //this.navCtrl.push(MatchingPage, {mission : m});
    this.navCtrl.setRoot(MatchingPage, {mission : m});
  }
}
