import {BaseComponent} from "../../frameworks/core/decorators/base.component";
import {OnInit, ChangeDetectionStrategy} from "@angular/core";
import {Observable} from "rxjs";
import {GithubService} from "../../frameworks/demo/services/github.service";
import {Router} from "@angular/router";

@BaseComponent({
  moduleId: module.id,
  selector: 'atd-about',
  templateUrl: 'github.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
  styleUrls: [ 'github.component.css' ]
})

export class GithubComponent implements OnInit{
  users: any[] = [];

  constructor( private router: Router,
               private githubService: GithubService) {
  }

  ngOnInit(): void {

    this.githubService.getUsers().subscribe(users => this.users = users);
  }

  gotoDetail(user: any) {
    let url = `/githubusers/${user.login}`;
    console.log(url);
    this.router.navigateByUrl(url);
  }
}
