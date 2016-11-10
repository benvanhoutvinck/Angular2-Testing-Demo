import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {  click, newEvent  } from '../../frameworks/core/testing/index';
import { ActivatedRoute, Router} from '@angular/router';
import { ActivatedRouteStub } from '../../frameworks/core/testing/router-stubs';
import { RouterStub } from '../../frameworks/core/testing/router-stubs';

import { GithubUserDetailComponent } from '../github/github-user-detail.component';
import { GithubService }   from '../../frameworks/demo/services/github.service';
import { GithubModule }          from './github.module';

import { USERS } from '../../frameworks/demo/testing/index';
import {FakeGithubService} from "../../frameworks/demo/testing/fake-github.service";

import { t } from '../../frameworks/test/index';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let comp: GithubUserDetailComponent;
let fixture: ComponentFixture<GithubUserDetailComponent>;
let page: Page;

////// Tests //////
export function main() {
  t.describe('GithubUserDetailComponent', () => {
    beforeEach(() => {
      activatedRoute = new ActivatedRouteStub();
    });
    t.describe('with GithubModule setup', githubModuleSetup);
    //describe('when override its provided HeroDetailService', overrideSetup);
    //describe('with FormsModule setup', formsModuleSetup);
    //describe('with SharedModule setup', sharedModuleSetup);
  });

}

////////////////////

const firstUser = USERS[0];

function githubModuleSetup() {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GithubModule],
      //  declarations: [ HeroDetailComponent ], // NO!  DOUBLE DECLARATION
      providers: [
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: GithubService, useClass: FakeGithubService},
        {provide: Router, useClass: RouterStub},
      ]
    })
      .compileComponents();
  }));

  describe('when navigate to existing user', () => {
    let expectedUser: any;

    beforeEach( async(() => {
      expectedUser = firstUser;
      activatedRoute.testParams = { login: expectedUser.login };
      createComponent();
    }));

    it('should display that user\'s username', () => {

      expect(page.loginDisplay.textContent).toBe(expectedUser.login);
    });

  });
}

/////////// Helpers /////

/** Create the HeroDetailComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(GithubUserDetailComponent);
  comp    = fixture.componentInstance;
  page    = new Page();

  // 1st change detection triggers ngOnInit which gets a user
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    // 2nd change detection displays the async-fetched hero
    fixture.detectChanges();
    page.addPageElements();
  });
}


class Page {
  //gotoSpy: jasmine.Spy;
  //navSpy: jasmine.Spy;
  //saveSpy: jasmine.Spy;

  //idDisplay: HTMLElement;
  loginDisplay: HTMLElement;

  constructor() {
    // Use component's injector to see the services it injected.
    //const compInjector = fixture.debugElement.injector;
    //const hds = compInjector.get(GithubService);
    //const router = compInjector.get(Router);

    //this.gotoSpy = spyOn(comp, 'gotoList').and.callThrough();
    //this.navSpy = spyOn(router, 'navigate');
    //this.saveSpy = spyOn(hds, 'saveHero').and.callThrough();
  }

  /** Add page elements after hero arrives */
  addPageElements() {
    if (comp.user) {
      // have a hero so these elements are now in the DOM


      //this.idDisplay = fixture.debugElement.query(By.css('h1')).nativeElement;
      this.loginDisplay = fixture.debugElement.query(By.css('span')).nativeElement;

    }
  }
}
