import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Hero } from '../model/hero';
import {BaseComponent} from "../../frameworks/core/decorators/base.component";

@BaseComponent({
  moduleId: module.id,
  selector:    'dashboard-hero',
  templateUrl: 'dashboard-hero.component.html',
  styleUrls: [ 'dashboard-hero.component.css' ]
})
export class DashboardHeroComponent {
  @Input() hero: Hero;
  @Output() selected = new EventEmitter<Hero>();
  click() { this.selected.next(this.hero); }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
