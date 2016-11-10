import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import {Observable} from "rxjs/Rx";


export var localUsers: any[] = [];


@Injectable()
export class GithubService {

  constructor(protected http: Http) {
  }

  getOrg(org: string) {
    return this.makeRequest(`orgs/${org}`);
  }

  getReposForOrg(org: string) {
    return this.makeRequest(`orgs/${org}/repos`);
  }

  getRepoForOrg(org: string, repo: string) {
    return this.makeRequest(`repos/${org}/${repo}`);
  }

  getUsers() {
    console.log("entering users list");
    if (localUsers.length === 0) {
      let usersObservable: Observable<any>  = this.makeRequest('users');
      usersObservable.subscribe(users => localUsers = users);

      return usersObservable;
    } else {
      console.log("getting local users");
      return Observable.of(localUsers);
    }
  }

  getUserByLogin(login: string): Promise<any> {
    //return this.makeRequest(`users/${login}`);
    return this.getUsers().toPromise().then(
      localUsers => localUsers.find(user => user.login === login)
    );
  }

  updateUser(user: any): Promise<any> {
    return this.getUserByLogin(user.login).then(u => {
      if (!u) {
        throw new Error(`User ${user.login} not found`);
      }
      return Object.assign(u, user);
    })
  }

  private makeRequest(path: string): Observable<any> {

    let params = new URLSearchParams();
    params.set('per_page', '100');


    let url = `https://api.github.com/${ path }`;
    console.log("making request: ", url);
    return this.http.get(url, {search: params})
      .map((res) => res.json());
  }
}
