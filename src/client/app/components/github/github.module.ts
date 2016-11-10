import {SharedModule} from "../shared/shared.module";
import {GithubComponent} from "./github.component";
import {GithubUserComponent} from "./github-user.component";
import { NgModule }               from '@angular/core';
import {GithubUserDetailComponent} from "./github-user-detail.component";
import {KeysPipe} from "./keyspipe.pipe";

@NgModule({
  imports:      [
    SharedModule
  ],
  declarations: [ GithubComponent, GithubUserComponent, GithubUserDetailComponent, KeysPipe ]
})
export class GithubModule { }
