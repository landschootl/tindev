import {Injectable} from "@angular/core";
import "rxjs/add/operator/toPromise";

@Injectable()
export class NavigationService {
	currentTarget: any = undefined;
	bypass : boolean = false;
	concernedProfile : any;
}
