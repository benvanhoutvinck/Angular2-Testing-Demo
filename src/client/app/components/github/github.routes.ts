import {GithubComponent} from "./github.component";
import {GithubUserDetailComponent} from "./github-user-detail.component";

export const GithubRoutes: Array<any> = [
  {
    path: 'github',
    component: GithubComponent
  },
  {
    path: 'githubusers/:login',
    component: GithubUserDetailComponent
  }
];
