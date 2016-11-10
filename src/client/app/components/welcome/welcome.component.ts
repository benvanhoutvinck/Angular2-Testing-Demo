import { Component, OnInit } from '@angular/core';
import { UserService }       from '../../frameworks/demo/services/user.service';
import {BaseComponent} from "../../frameworks/core/decorators/base.component";

@BaseComponent({
  moduleId: module.id,
  selector: 'atd-welcome',
  template: '<h3 class="welcome" ><i>{{welcome}}</i></h3>'

})

export class WelcomeComponent  implements OnInit {
  welcome = '-- not initialized yet --';
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.welcome = this.userService.isLoggedIn ?
      'Welcome, ' + this.userService.user.name :
      'Please log in.';
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
