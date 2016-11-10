import {BaseComponent} from "../../frameworks/core/decorators/base.component";
import {GithubService} from "../../frameworks/demo/services/github.service";
import {Router, ActivatedRoute} from "@angular/router";
import {Input, OnInit, ChangeDetectionStrategy} from '@angular/core';

@BaseComponent({
  moduleId: module.id,
  selector:    'github-user-detail',
  templateUrl: 'github-user-detail.component.html',
  styleUrls:  ['github-user-detail.component.css' ],
  changeDetection: ChangeDetectionStrategy.Default
})

export class GithubUserDetailComponent implements OnInit {
  constructor(private githubService: GithubService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  @Input() user: any;

  ngOnInit(): void {
    // get user when `id` param changes
    this.route.params.pluck<string>('login')
      .forEach(login => this.getUser(login));
  }

  private getUser(login: string): void {

    // Sets a clone which caller may modify safely
    this.githubService.getUserByLogin(login).then(user => this.user = Object.assign({}, user));

  }

  save(): void {
    this.githubService.updateUser(this.user).then(() => this.gotoList());
  }

  gotoList() {
    this.router.navigate(['github']);
  }

}

