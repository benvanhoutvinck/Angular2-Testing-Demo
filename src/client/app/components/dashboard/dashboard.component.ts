import {OnInit, ChangeDetectionStrategy} from '@angular/core';
import { Router }            from '@angular/router';

import {BaseComponent} from "../../frameworks/core/decorators/base.component";
import {Hero} from "../model/hero";
import {HeroService} from "../model/hero.service";

@BaseComponent({
  moduleId: module.id,
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: [ 'dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {

  public heroes: Hero[] = [];

  constructor(
    private router: Router,
    private heroService: HeroService) {
  }

  ngOnInit(): void {
    this.heroService.getHeroes()
      .then(heroes => this.heroes = heroes.slice(1, 5));
  }

  gotoDetail(hero: Hero) {
    let url = `/heroes/${hero.id}`;
    console.log(url);
    this.router.navigateByUrl(url);
  }

  get title() {
    let cnt = this.heroes.length;
    return cnt === 0 ? 'No Heroes' :
      cnt === 1 ? 'Top Hero' :  `Top ${cnt} Heroes`;
  }
}


