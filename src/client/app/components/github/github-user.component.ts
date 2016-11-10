import { Component, EventEmitter, Input, Output } from '@angular/core';
import {BaseComponent} from "../../frameworks/core/decorators/base.component";

@BaseComponent({
  moduleId: module.id,
  selector:    'github-user',
  templateUrl: 'github-user.component.html',
  styleUrls: [ 'github-user.component.css' ]
})
export class GithubUserComponent {
  @Input() user: any;
  @Output() selected = new EventEmitter<any>();
  click() { this.selected.next(this.user); }
}
