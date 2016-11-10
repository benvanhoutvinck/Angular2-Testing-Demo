import {ComponentFixture, inject, TestBed, async, tick, fakeAsync} from '@angular/core/testing';
import { By }                                from '@angular/platform-browser';
import { DebugElement }                      from '@angular/core';
import { Http, BaseRequestOptions } from '@angular/http';

import { GithubService }      from '../../frameworks/demo/services/github.service';
import { GithubComponent } from './github.component';
import {MockBackend} from "@angular/http/testing";
import {Observable} from "rxjs/Rx";
export function main() {

  describe('@Component: GithubComponent', () => {

    let comp: GithubComponent;
    let fixture: ComponentFixture<GithubComponent>;
    let componentGithubService: GithubService; // the actually injected service
    let githubService: GithubService; // the TestBed injected service
    let de: DebugElement;  // the DebugElement with the welcome message
    let el: HTMLElement; // the DOM element with the welcome message
    let spy: jasmine.Spy;

    let githubServiceStub: {

      user: { login: string,
        id: number}
    };

    var testUsers: { id: number, name: string }[] = [
      { "id": 0, "name": "Available" },
      { "id": 1, "name": "Ready" },
      { "id": 2, "name": "Started" }
    ];

    // async beforeEach
    beforeEach( async(() => {

      // stub UserService for test purposes
      githubServiceStub = {
        user: {login: 'Test User', id: 1}
      };

      TestBed.configureTestingModule({
        declarations: [GithubComponent],
        providers:    [  MockBackend,
          BaseRequestOptions,
          {
            provide: Http,
            useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backendInstance, defaultOptions);
            },
            deps: [MockBackend, BaseRequestOptions]
          },
          GithubService ]

      })
        .compileComponents(); // compile template and css
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(GithubComponent);

      comp = fixture.componentInstance;

      // UserService actually injected into the component
      githubService = fixture.debugElement.injector.get(GithubService);


      // Setup spy on the `getUsers` method
      spy = spyOn(githubService, 'getUsers').and.returnValue(Observable.of(testUsers));

      //  get the "users" element by CSS selector (e.g., by class name)
      de = fixture.debugElement.query(By.css('.users'));
      el = de.nativeElement;

    });

    /*The first two tests are synchronous.
     Thanks to the spy, they verify that getUsers is called after the first change detection cycle during which Angular calls ngOnInit.*/

    it('should not show users before OnInit', () => {
      expect(el.children.length).toBe(0,'no users displayed yet');
      expect(spy.calls.any()).toBe(false, 'getUsers not yet called');
    });

    it('should still not show users after component initialized', () => {
      fixture.detectChanges();
      // getUsers service is async => still has not returned with users
      expect(el.children.length).toBe(0,'no users displayed yet');
      expect(spy.calls.any()).toBe(true, 'getUsers called');
    });

    it('should show users after getUsers promise (async)', async(() => {
      fixture.detectChanges();
      fixture.whenStable().then(() => { // wait for async getUsers
        fixture.detectChanges();        // update view with quote
        expect(el.children.length).toBe(3,'3 users displayed');
      });
    }));

    it('should show users after getUsers promise (fakeAsync)', fakeAsync(() => {
      fixture.detectChanges();
      tick();                  // wait for async getUsers
      fixture.detectChanges(); // update view with users
      expect(el.children.length).toBe(3,'3 users displayed');
    }));

    it('should show users after getUsers promise (done)', done => {
      fixture.detectChanges();

      // get the spy promise and wait for it to resolve
      spy.calls.mostRecent().returnValue.then(() => {
        fixture.detectChanges(); // update view with quote
        expect(el.children.length).toBe(3,'3 users displayed');
        done();
      });

    });
  })}
