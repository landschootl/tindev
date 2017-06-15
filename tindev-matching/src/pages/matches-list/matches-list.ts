import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { Conversation } from '../../shared/models/conversation';
import { ConversationService} from '../../providers/conversation-service';
import { ToastController } from 'ionic-angular';
import { ConversationPage } from '../../pages/conversation/conversation'
/*
  Generated class for the MatchesList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-matches-list',
  templateUrl: 'matches-list.html'
})
export class MatchesListPage {
  loading : Loading;
  data : Array<Conversation>;
  searchMatchingData : Array<Conversation>;
  searchinput :string =  '';
  showSearchLoader : boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public conv : ConversationService, private loadingCtrl: LoadingController, private toastCtrl : ToastController) {
  	/*
  	Waited json : 
  	{"Conversations" : [{
  		"project_name" : "Chef de projet Big Data",
  		"interlocutor_name" : "Ali Connors",
  		"last_message" : {
  			"date_sent" : "18/05/2017 13:58:23",
  			"content" : "Hello Mr. I'm sending you this message in order to have a meeting with you because I think your profile is exactly what we need for our project"
  	  	},
  	  	"project_name" : "Développeur mobile",
  		"interlocutor_name" : "Trevor Hansen",
  		"last_message" : {
  			"date_sent" : "18/05/2017 13:57:23",
  			"content" : "Hello Mr. I'm sending you this message in order to have a meeting with you because I think your profile is exactly what we need for our project"
  	  	},
  	  	"project_name" : "Développeur fullstack",
  		"interlocutor_name" : "Sandra Adams",
  		"last_message" : {
  			"date_sent" : "18/05/2017 13:57:22",
  			"content" : "Hello Mr. I'm interested in your profile. Please contact my associate Mr Trevor Jensen"
  	  	}
  	  }]}
  	  */
  	  this.initializeItems();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MatchesListPage');
  }

  initializeItems() {
  	this.showLoading();
  	this.conv.apiGetConversations().subscribe(data => {
      console.log(data);
      this.data = data;
      this.searchMatchingData = data;
    },
      error => {
        this.loading.dismiss();
        this.showToast("We were unable to get your conversations");
      });
  }

  public showToast(text) { 
    let toast = this.toastCtrl.create({
      message: text,
      duration: 2000,
      position: 'bottom',
      showCloseButton : true,
      closeButtonText : "Retry"
    });
    toast.onDidDismiss(() => {
    	this.initializeItems();
    });
    toast.present(toast);
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Retrieving conversations...',
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
      if(d.project_name.toLowerCase().includes(input.toLowerCase()) 
        || d.interlocutor_name.toLowerCase().includes(input.toLowerCase())) {
        this.searchMatchingData.push(d);
      }
    }
    this.showSearchLoader = false;
  }

  openConversationPage(c : Conversation) {
    this.navCtrl.push(ConversationPage, {conversation : c});
  }
}
