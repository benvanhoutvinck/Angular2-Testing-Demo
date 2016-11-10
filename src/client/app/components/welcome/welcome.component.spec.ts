// angular
import { Component, DebugElement} from '@angular/core';
import {TestBed, ComponentFixture, inject} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// app
import { t } from '../../frameworks/test/index';
import { WelcomeComponent } from './welcome.component';
import {UserService} from "../../frameworks/demo/services/user.service";

export function main() {

  let comp: WelcomeComponent;
  let fixture: ComponentFixture<TestComponent>;
  let componentUserService: UserService; // the actually injected service
  let userService: UserService; // the TestBed injected service
  let de: DebugElement;  // the DebugElement with the welcome message
  let el: HTMLElement; // the DOM element with the welcome message

  t.describe('@Component: WelcomeComponent', () => {

    let userServiceStub: {
      isLoggedIn: boolean;
      user: { name: string}
    };

    beforeEach(() => {

      userServiceStub = {
        isLoggedIn: true,
        user: { name: 'Test User'}
      };

      TestBed.configureTestingModule({
        declarations: [ WelcomeComponent, TestComponent ],
        providers:    [ {provide: UserService, useValue: userServiceStub } ],
      })

      // create TestComponent instead of WelcomeComponent
      fixture = TestBed.createComponent(TestComponent);
      // get the component-under-test
      comp = fixture.debugElement.children[0].componentInstance;

      // UserService actually injected into the component
      userService = fixture.debugElement.injector.get(UserService);
      componentUserService = userService;
      // UserService from the root injector
      userService = TestBed.get(UserService);

      de = fixture.debugElement.query(By.css('h3')); // get the debug element

      el = de.nativeElement; // and finally the HTML element

    });

    t.it('should welcome the user', () => {
      fixture.detectChanges();
      const content = el.textContent;
      expect(content).toContain('Welcome', '"Welcome ..."');
      expect(content).toContain('Test User', 'expected name');
    });

    t.it('should welcome "Bubba"', () => {
      userService.user.name = 'Bubba'; // welcome message hasn't been shown yet
      fixture.detectChanges();
      expect(el.textContent).toContain('Bubba');
    });

    t.it('should request login if not logged in', () => {
      userService.isLoggedIn = false; // welcome message hasn't been shown yet
      fixture.detectChanges();
      const content = el.textContent;
      expect(content).not.toContain('Welcome', 'not welcomed');
      expect(content).toMatch(/log in/i, '"log in"');
    });

    it('should inject the component\'s UserService instance',
      inject([UserService], (service: UserService) => {
        expect(service).toBe(componentUserService);
      }));

    it('TestBed and Component UserService should be the same', () => {
      expect(userService === componentUserService).toBe(true);
    });

    it('stub object and injected UserService should not be the same', () => {
      expect(userServiceStub === userService).toBe(false);

      // Changing the stub object has no effect on the injected service
      userServiceStub.isLoggedIn = false;
      expect(userService.isLoggedIn).toBe(true);
    });

  });
}

@Component({
  selector: 'test-cmp',
  template: '<atd-welcome></atd-welcome>'
})
class TestComponent {

}
