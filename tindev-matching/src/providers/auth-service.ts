import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { User } from '../shared/models/user';
import { ApiUtils } from '../shared/utils/api';
import { Http, RequestOptions, Response } from '@angular/http';
import { Storage } from '@ionic/storage';
import { UserService } from './user-service';
import 'rxjs/add/operator/map';
//Sauf erreur de ma part, ca ne devrait pas être ici je suppose

@Injectable()
export class AuthService {
    public currentUser: User;
    public token: string;

    constructor(private http: Http, private storage: Storage, private apic: ApiUtils, private user: UserService) {
        this.storage.get('currentUser').then((user: any) => {
            let currentUser = JSON.parse(user);
            this.token = currentUser && currentUser.token;
        });
    }

    /*
     * Calling api to authenticate an user
     */
    public apiAuthenticate(credentials): Observable<boolean> {
        return this.http.post(this.apic.base_url + 'authenticate',
            {
                username: credentials.username,
                password: credentials.password
            })
            .map((response: Response) => {
                //Successful connection
                let token = response.json() && response.json().id_token;
                if (token) {
                    this.token = token;
                    //Saving the user and his token into the storage
                    this.storage.set('currentUser', JSON.stringify({ username: credentials.username, token: token }));
                    return true;
                } else {
                    return false;
                }
            });
    }

    /*
     * Calling api to get info for the actually authenticated user
     */

    public apiAccount(): Observable<User> {
        let headers = this.apic.getHeadersWithToken(this.token);
        let options = new RequestOptions({ headers: headers });
        return this.http.get(this.apic.base_url + 'account', options)
            .map((response: Response) => {
                let json = response.json();
                //TODO add verification on whether the user is a recruiter or not
                //TODO add veriication if the profile is completed or not
                let isRecruiter: boolean = json.authorities.indexOf('ROLE_RECRUITER') >= 0;
                if (isRecruiter) {
                    this.user.getRecruitersIdForUser(json.id, this.token).subscribe(id => {
                        this.currentUser.specId = id;
                    });
                }
                // >= 0
                this.currentUser = new User(json.id, json.firstName, json.lastName, isRecruiter, json.email, true, this.token);
                this.storage.set('currentUser', JSON.stringify({ user: this.currentUser }));
                return this.currentUser;
            });
    }

    public getUserInfo(): User {
        return this.currentUser;
    }

    public logout() {
        return Observable.create(observer => {
            this.currentUser = null;
            this.storage.remove('currentUser');
            observer.next(true);
            observer.complete();
        });
    }
}
