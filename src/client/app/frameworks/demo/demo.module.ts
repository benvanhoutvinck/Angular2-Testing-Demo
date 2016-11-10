import {NgModule, Optional, SkipSelf} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {MultilingualModule} from "../i18n/multilingual.module";
import {StoreModule} from "@ngrx/store";
import {ToolbarComponent} from "./components/toolbar/toolbar.component";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {NameListService} from "../demo/services/name-list.service";
import {UserService} from "../demo/services/user.service";
import {HeroService} from "../../components/model/hero.service";
import {GithubService} from "./services/github.service";


@NgModule ({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule,
    MultilingualModule,
    StoreModule
  ],
  declarations: [
    ToolbarComponent,
    NavbarComponent
  ],
  providers: [
    NameListService,
    UserService,
    HeroService,
    GithubService
  ],
  exports: [
    ToolbarComponent,
    NavbarComponent,
    MultilingualModule
  ]


})
export class DemoModule {

  constructor(@Optional() @SkipSelf() parentModule: DemoModule) {
    if (parentModule) {
      throw new Error('DemoModule already loaded; Import in root module only.');
    }
  }
}
