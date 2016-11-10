
import {Observable} from "rxjs/Rx";

export var USERS: { id: number, login: string }[] = [
  { "id": 0, "login": "Available" },
  { "id": 1, "login": "Ready" },
  { "id": 2, "login": "Started" }
];

export class FakeGithubService {

  users = USERS;
  lastObservable: Observable<any>;
  lastPromise: Promise<any>;

  getUser(id: number | string): Observable<any> {
    if (typeof id === 'string') {
      id = parseInt(id as string, 10);
    }
    let user = this.users.find(h => h.id === id);
    return this.lastObservable = Observable.of(user);
    //return undefined;
  }

  getUserByLogin(login: string): Promise<any> {
    //return this.makeRequest(`users/${login}`);
    let user = this.users.find(h => h.login === login);
    return this.lastPromise = Promise.resolve(user);
  }

  getUsers(): Observable<any> {
    return this.lastObservable = Observable.of(this.users);
    //return undefined;
  }

}
