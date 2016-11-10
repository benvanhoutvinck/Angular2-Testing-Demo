import {async, TestBed, ComponentFixture, inject} from "@angular/core/testing";
import { By } from '@angular/platform-browser';
import {Router} from "@angular/router";
import {GithubService} from "../../frameworks/demo/services/github.service";
import {FakeGithubService} from "../../frameworks/demo/testing/fake-github.service";
import {t} from '../../frameworks/test/index';
import {GithubComponent} from "./github.component";
import {GithubModule} from "./github.module";
import {click} from "../../frameworks/core/testing/index";

class RouterStub {
  navigateByUrl(url: string) {
    return url;
  }
}

let comp: GithubComponent;
let fixture: ComponentFixture<GithubComponent>;

export function main() {

  t.describe('@Component: GithubComponent', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ GithubModule ]
      });
    });

    compileAndCreate();

    tests(clickForDeep);

    function clickForDeep() {
      // get first <div class="hero"> DebugElement
      const heroEl = fixture.debugElement.query(By.css('.hero'));
      click(heroEl);
    }

  });

}

/** Add TestBed providers, compile, and create DashboardComponent */
function compileAndCreate() {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: GithubService, useClass: FakeGithubService},
        {provide: Router, useClass: RouterStub}
      ]
    })
      .compileComponents().then(() => {
      fixture = TestBed.createComponent(GithubComponent);
      comp = fixture.componentInstance;
    });

  }));
}

function tests(heroClick: Function) {

  it('should NOT have users before ngOnInit', () => {
    expect(comp.users.length).toBe(0,
      'should not have users before ngOnInit');
  });

  it('should NOT have users immediately after ngOnInit', () => {
    fixture.detectChanges(); // runs initial lifecycle hooks

    expect(comp.users.length).toBe(0,
      'should not have users until service promise resolves');
  });

  describe('after get github users', () => {

    // Trigger component so it gets users and binds to them
    beforeEach(async(() => {
      fixture.detectChanges(); // runs ngOnInit -> getHeroes
      fixture.whenStable() // No need for the `lastPromise` hack!
        .then(() => fixture.detectChanges()); // bind to users
    }));

    it('should HAVE users', () => {
      expect(comp.users.length).toBeGreaterThan(0,
        'should have users after service promise resolves');
    });

    it('should DISPLAY users', () => {
      // Find and examine the displayed heroes
      // Look for them in the DOM by css class
      const users = fixture.debugElement.queryAll(By.css('github-user'));
      expect(users.length).toBe(3, 'should display 3 users');
    });

    it('should tell ROUTER to navigate when user clicked',
      inject([Router], (router: Router) => { // ...

        const spy = spyOn(router, 'navigateByUrl');

        heroClick(); // trigger click on first inner <div class="hero">

        // args passed to router.navigateByUrl()
        const navArgs = spy.calls.first().args[0];

        // expecting to navigate to id of the component's first user
        const id = comp.users[0].id;
        expect(navArgs).toBe('/githubusers/' + id,
          'should nav to UserDetail for first user');
      }));
  });
}
