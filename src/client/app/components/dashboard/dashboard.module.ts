import { NgModule }               from '@angular/core';

import { DashboardComponent }     from './dashboard.component';
import { DashboardHeroComponent } from './dashboard-hero.component';
import { SharedModule }           from '../shared/shared.module';

@NgModule({
  imports:      [
    SharedModule
  ],
  declarations: [ DashboardComponent, DashboardHeroComponent ]
})
export class DashboardModule { }


