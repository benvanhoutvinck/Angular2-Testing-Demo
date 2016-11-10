import { NgModule }     from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HeroDetailComponent }  from './hero-detail.component';

@NgModule({
  imports:      [ SharedModule ],
  declarations: [ HeroDetailComponent ]
})
export class HeroModule { }
