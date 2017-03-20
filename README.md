# Angular2 Testing #
##### You write tests to explore and confirm the behavior of the application. #####
1. They **guard** against changes that break existing code (“regressions”).
2. They **clarify** what the code does both when used as intended and when faced with deviant conditions.
3. They **reveal** mistakes in design and implementation. Tests shine a harsh light on the code from many angles. When a part of the application seems hard to test, the root cause is often a design flaw, something to cure now rather than later when it becomes expensive to fix.

###Tools and Technologies###
- **Jasmine**: The Jasmine test framework. provides everything needed to write basic tests. It ships with an HTML test runner that executes tests in the browser.
- **Angular Testing Utilities**: The Angular testing utilities create a test environment for the Angular application code under test. Use them to condition and control parts of the application as they interact within the Angular environment.
- **Karma**: The karma test runner is ideal for writing and running unit tests while developing the application. It can be an integral part of the project's development and continuous integration processes. This chapter describes how to setup and run tests with karma.
- **Protractor**: Use protractor to write and run end-to-end (e2e) tests. End-to-end tests explore the application as users experience it. In e2e testing, one process runs the real application and a second process runs protractor tests that simulate user behavior and assert that the application responds in the browser as expected.

### Setup ###
TODO
### Run karma ###

Compile and run it in karma from the command line with this command:

    npm test
After a few moments, karma opens a browser and starts writing to the console.
Both the compiler and karma continue to run. The compiler output is preceeded by [0]; the karma output by [1].

> The console log can be quite long. Keep your eye on the last line. It says **SUCCESS** when all is well. 

### Test debugging ###

- Reveal the karma browser window.
- Click the "DEBUG" button; it opens a new browser tab and re-runs the tests
- Open the browser's “Developer Tools” (F12 or Ctrl-Shift-I).
- Pick the "sources" section
- Open the .spec.ts test file (Ctrl-P, then start typing the name of the file).
- Set a breakpoint in the test
- Refresh the browser … and it stops at the breakpoint.

## Introduction to the Angular Testing Utilities ##

### Isolated unit tests ###

Isolated unit tests examine an instance of a class all by itself without any dependence on Angular or any injected values. The tester creates a test instance of the class with new, supplying test doubles for the constructor parameters as needed, and then probes the test instance API surface.

>You can and should write isolated unit tests for pipes and services.

### Testing with the Angular Testing Utilities ###
The Angular testing utilities include the ***TestBed*** class and several helper functions from @angular/core/testing.

The ***TestBed*** creates an Angular testing module — an @NgModule class — that you configure to produce the module environment for the class you want to test. You tell the TestBed to create an instance of the component-under-test and probe that instance with tests.

Before each spec, the TestBed resets itself to a base state. The base state includes a default testing module configuration consisting of the declarables (components, directives, and pipes) and providers (some of them mocked) that almost everyone needs.

### A first test! ###
The top of the screen displays application title, presented by the ToolbarComponent in app/frameworks/demo/components/toolbar/toolbar.component.ts.

    title = 'Angular 2 Testing Demo :-)';
The corresponding toolbar.component.spec.ts file sits in the same folder as the component. BannerComponent has a template url and an interpolation binding. The component is probably too simple to be worth testing in real life but it's perfect for a first encounter with the TestBed.

Start with ES6 import statements to get access to symbols referenced in the spec.

    // angular
    import {Component, DebugElement} from '@angular/core';
    import {TestBed, ComponentFixture, async} from '@angular/core/testing';
    import { NO_ERRORS_SCHEMA }  from '@angular/core';
    
    // app
    import {t} from '../../../test/index';
    import { TEST_CORE_PROVIDERS } from '../../../core/testing/index';
    import {ToolbarComponent} from './toolbar.component';



- **t**: is provided by the seed advanced and is purely a convenience class, providing shorthand notations for a collection of Jasmine functions.



- **Componentfixture**: a handle on the test environment surrounding the created component. The fixture provides access to the component instance itself and to the DebugElement which is a handle on the component's DOM element.



- **NO\_ERRORS\_SCHEMA**: Add NO\_ERRORS\_SCHEMA to the testing module's schemas metadata to tell the compiler to ignore unrecognized elements and attributes. You no longer have to declare irrelevant components and directives. We use it here to ignore the `<lang-switcher></lang-switcher> ` element in the template.



- **TEST\_CORE\_PROVIDERS**: is provided by the seed advanced and is a collection of mocks for several service providers. In our example it is used to mock the logService.




###Test a component inside a test host component###

Since the ToolbarComponent is nested within the AppComponent we need a parenet component to be able to run the tests. Testing with the actual parent component is doable but seems more trouble than its worth. It's easier to emulate the AppComponent host with a test host like this one:

    @Component({
      selector: 'test-cmp',
      template: '<atd-toolbar></atd-toolbar>'
    })
    class TestComponent {
    }

The setup for the test-host is as follows:

      beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ ToolbarComponent, TestComponent ],
        providers:    [ TEST_CORE_PROVIDERS() ],
        schemas:      [ NO_ERRORS_SCHEMA ]
      }).compileComponents();
    }));

    beforeEach(() => {
      // create TestComponent instead of ToolbarComponent
      fixture = TestBed.createComponent(TestComponent);
      // get the component-under-test
      toolbarInstance = fixture.debugElement.children[0].componentInstance;
      de = fixture.debugElement.query(By.css('h1')); // get the debug element
      el = de.nativeElement; // and finally the HTML element
      fixture.detectChanges(); // trigger initial data binding

    });

`TestBed.configureTestingModule` takes an @NgModule-like metadata object. This one declares the component to test, `ToolbarComponent` and the test host, `TestComponent`.

The fixture returned by createComponent holds an instance of TestComponent instead of an instance of ToolbarComponent.

Of course creating the TestComponent has the side-effect of creating a ToolbarComponent because the latter appears within the template of the former. The query for the h1 element still finds it in the test DOM albeit at greater depth in the element tree than before.

####ComponentFixture, DebugElement, and query(By.css)####

The `createComponent` method returns a `ComponentFixture`, a handle on the test environment surrounding the created component. The fixture provides access to the component instance itself and to the `DebugElement` which is a handle on the component's DOM element.

The title property value was interpolated into the DOM within `<h1>` tags. Use the fixture's DebugElement to query for the `<h1>` element by CSS selector.

The query method takes a predicate function and searches the fixture's entire DOM tree for the first element that satisfies the predicate. The result is a different DebugElement, one associated with the matching DOM element.

The `By` class is an Angular testing utility that produces useful predicates. Its `By.css` static method produces a standard CSS selector predicate that filters the same way as a jQuery selector.

Finally, the setup assigns the DOM element from the DebugElement nativeElement property to el. The tests will assert that el contains the expected title text.

####The tests####
> Jasmine runs the beforeEach function before each of these tests

      t.it('should display original title', () => {
      fixture.detectChanges(); // trigger initial data binding
      t.e(el.textContent).toContain('Angular 2 Testing Demo :-)');
    })

    t.it('should display new title', () => {
      toolbarInstance.title = 'testtitle';
      fixture.detectChanges(); // trigger initial data binding
      t.e(el.textContent).toContain('testtitle');
    })

####detectChanges: Angular change detection within a test####
Each test tells Angular when to perform change detection by calling `fixture.detectChanges()`. The first test does so immediately, triggering data binding and propagation of the title property to the DOM element.

The second test changes the component's title property and only then calls fixture.detectChanges(); the new value appears in the DOM element.

###Test a component with a dependency###
Components often have service dependencies. The `WelcomeComponent` displays a welcome message to the logged in user. It knows who the user is based on a property of the injected UserService:

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



The `WelcomeComponent` has decision logic that interacts with the service, logic that makes this component worth testing. Here's the testing module configuration for the spec file, `app/components/welcome/welcome.component.spec.ts`:

     TestBed.configureTestingModule({
    	declarations: [ WelcomeComponent, TestComponent ],
    	providers:[ {provide: UserService, useValue: userServiceStub } ],
      })
This time, in addition to declaring the component-under-test, the configuration adds a UserService provider to the providers list. But not the real UserService.

####Provide service test doubles####
Injecting the real `UserService` could be a nightmare. The real service might try to ask the user for login credentials and try to reach an authentication server. These behaviors could be hard to intercept. It is far easier and safer to create and register a test double in place of the real `UserService`.

This particular test suite supplies a minimal UserService stub that satisfies the needs of the WelcomeComponent and its tests:
    let userServiceStub: {
      isLoggedIn: boolean;
      user: { name: string}
    };
####Get injected services####
The tests need access to the (stub) `UserService` injected into the `WelcomeComponent`.

Angular has a hierarchical injection system. There can be injectors at multiple levels, from the root injector created by the `TestBed` down through the component tree.

The safest way to get the injected service, the way that **always works**, is to **get it from the injector of the component-under-test**. The component injector is a property of the fixture's DebugElement.

     // UserService actually injected into the component
      userService = fixture.debugElement.injector.get(UserService);

#### The tests ####

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

The first is a sanity test; it confirms that the stubbed UserService is called and working.


> The second parameter to the Jasmine `it` (e.g., '`expected name`') is an optional addendum. If the expectation fails, Jasmine displays this addendum after the expectation failure message. It can help clarify what went wrong and which expectation failed in a spec with multiple expectations.

The remaining tests confirm the logic of the component when the service returns different values. The second test validates the effect of changing the user name. The third test checks that the component displays the proper message when there is no logged-in user.

### Test a component with an async service ###

Many services return values asynchronously. Most data services make an HTTP request to a remote server and the response is necessarily asynchronous.

The "Github" view in this sample displays Github users. The `GithubComponent` handles the display, delegating the server request to the `GithubService`. Here is the GithubComponent:

    @BaseComponent({
      moduleId: module.id,
      selector: 'atd-about',
      templateUrl: 'github.component.html',
      changeDetection: ChangeDetectionStrategy.Default
    })
    
    export class GithubComponent implements OnInit{
      users: Observable<any[]>;
    
      constructor(private githubService: GithubService) {
      }
    
      ngOnInit(): void {
    
    	this.githubService.getUsers().subscribe(users => this.users = users);
      }
    }

The `GithubService` implementation is irrelevant at this point. It is sufficient to see within `ngOnInit` that `githubService.getUsers` returns an Observable which means it is asynchronous.

In general, tests should not make calls to remote servers. They should emulate such calls. The setup in this app/components/github/github.component.spec.ts shows one way to do that:

      beforeEach(() => {
	      fixture = TestBed.createComponent(GithubComponent);
	      
	      comp = fixture.componentInstance;
	    
	      // UserService actually injected into the component
	      githubService = fixture.debugElement.injector.get(GithubService);
	    
	      // Setup spy on the `getUsers` method
	      spy = spyOn(githubService, 'getUsers').and.returnValue(Promise.resolve(testUsers));
	    
	      //  get the "users" element by CSS selector (e.g., by class name)
	      de = fixture.debugElement.query(By.css('.users'));
	      el = de.nativeElement;
      
    });

####Spying on the real service####
This setup is similar to the `welcome.component.spec` setup. But instead of creating a stubbed service object, it injects the real service (see the testing module `providers`) and replaces the critical getUsers method with a Jasmine spy.

    // Setup spy on the `getUsers` method
    spy = spyOn(githubService, 'getUsers').and.returnValue(Promise.resolve(testUsers));

The spy is designed such that any call to `getUsers` receives an immediately resolved promise with test users. The spy bypasses the actual getUsers method and therefore will not contact the server.

####The Tests####
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
      fixture.whenStable().then(() => { // wait for async getQuote
    fixture.detectChanges();// update view with quote
    expect(el.children.length).toBe(3,'3 users displayed');
      });
    }));
    
    it('should show users after getUsers promise (fakeAsync)', fakeAsync(() => {
      fixture.detectChanges();
      tick();  // wait for async getUsers
      fixture.detectChanges(); // update view with users
      expect(el.children.length).toBe(3,'3 users displayed');
    }));

####Synchronous tests####
The first two tests are synchronous. Thanks to the spy, they verify that `getUsers` is called after the first change detection cycle during which Angular calls `ngOnInit`.

Neither test can prove that a value from the service is being displayed. The users themself have not arrived, despite the fact that the spy returns a resolved promise.

This test must wait at least one full turn of the JavaScript engine before the value becomes available. The test must become asynchronous.

####The async function in *it*####
    it('should show users after getUsers promise (async)', async(() => {
	      fixture.detectChanges();
	      fixture.whenStable().then(() => { // wait for async getUsers
	      fixture.detectChanges();// update view with users
	      expect(el.children.length).toBe(3,'3 users displayed');
      });
    }));
The `async` function is one of the Angular testing utilities. It simplifies coding of asynchronous tests by arranging for the tester's code to run in a special *async test zone*.

The `async` function takes a parameterless function and returns a function which becomes the argument to the Jasmine `it` call.

The body of the async argument looks much like the body of a normal it argument. There is nothing obviously asynchronous about it. For example, it doesn't return a promise and there is no done function to call as there is in standard Jasmine asynchronous tests.

Some functions called within a test (such as fixture.whenStable) continue to reveal their asynchronous behavior.

####whenStable####
The test must wait for the getUsers Observable to resolve in the next turn of the JavaScript engine.

This test has no direct access to the observable returned by the call to `githubService.getUsers` which is private and inaccessible inside `GithubComponent`.

Fortunately, the getQuote promise is accessible to the async test zone which intercepts all promises issued within the async method call.

The ComponentFixture.whenStable method returns its own promise which resolves when the getQuote promise completes. In fact, the whenStable promise resolves when all pending asynchronous activities within this test complete ... the definition of "stable".

Then the test resumes and kicks off another round of change detection (fixture.detectChanges) which tells Angular to update the DOM with the quote. The getQuote helper method extracts the display element text and the expectation confirms that the text matches the test quote.

###Test a component with inputs and outputs###
A component with inputs and outputs typically appears inside the view template of a host component. The host uses a property binding to set the input property and uses an event binding to listen to events raised by the output property.

The testing goal is to verify that such bindings work as expected. The tests should set input values and listen for output events.

The `DashboardHeroComponent` is a tiny example of a component in this role. It displays an individual hero provided by the DashboardComponent. Clicking that hero tells the DashboardComponent that the user has selected the hero.

The `DashboardHeroComponent` is embedded in the `DashboardComponent` template like this:

     <dashboard-hero *ngFor="let hero of heroes"  class="col-1-4"
    	[hero]=hero  (selected)="gotoDetail($event)" >
      </dashboard-hero>

###Test a routed component###

Testing the actual `GithubComponent` seems daunting because it injects the Router. As a rule you test the component, not the router, and care only if the component navigates with the right address under the given conditions. Stubbing the router with a test implementation is an easy option. This should do the trick:

    class RouterStub {
      navigateByUrl(url: string) { return url; }
    }

Now we setup the testing module with the test stubs for the `Router` and `GithubService` and create a test instance of the `GithubComponent` for subsequent testing.

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

The following test clicks the displayed user and confirms (with the help of a spy) that Router.navigateByUrl is called with the expected url.

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

####The *inject* function####
Notice the *inject* function in the second it argument:

     it('should tell ROUTER to navigate when user clicked',
      inject([Router], (router: Router) => { // ...
    }));
The `inject` function is one of the Angular testing utilities. It injects services into the test function where you can alter, spy on, and manipulate them.

The `inject` function has two parameters:
1. an array of Angular dependency injection tokens
2. a test function whose parameters correspond exactly to each item in the injection token array

> The `inject` function uses the current `TestBed` injector and can only return services provided at that level. It does not return services from component providers.

###Test a routed component with parameters###
Clicking a Github user triggers navigation to `githubusers/:id` where :id is a route parameter whose value is the id of the user to view. That URL matches a route to the `GithubUserDetailComponent`.

The router pushes the :id token value into the `ActivatedRoute.params` Observable property, Angular injects the `ActivatedRoute` into the `GithubUserDetailComponent`, and the component extracts the id so it can fetch the corresponding user via the GithubService. Here's the `GithubUserDetailComponent` constructor:

     constructor(
	    private heroDetailService: HeroDetailService,
	    private route:  ActivatedRoute) {
      }

`GithubUserDetailComponent` listens for changes to the `ActivatedRoute.params` in its `ngOnInit` method.

     ngOnInit(): void {
	    // get user when `id` param changes
	    this.route.params.pluck<string>('id')
	      .forEach(id => this.getUser(id));
      }

> The expression after `route.params` chains an *Observable* operator that plucks the id from the params and then chains a forEach operator to subscribes to id-changing events. The id changes every time the user navigates to a different user.
> 
> The forEach passes the new id value to the component's getUser method (not shown) which fetches a user and sets the component's user property.

A test can explore how the HeroDetailComponent responds to different id parameter values by manipulating the ActivatedRoute injected into the component's constructor.

By now you know how to stub the Router and a data service. Stubbing the ActivatedRoute would follow the same pattern except for a complication: the ActivatedRoute.params is an Observable.



##e2e testing with protractor##
- npm install webdriver-manager <- Install this first for e2e testing
- npm run webdriver-update <- You will need to run this the first time
- *bugfix* in package.json, change the line `"webdriver-start": "node_modules/protractor/bin/webdriver-manager start"` to `"webdriver-start": "node ./node_modules/protractor/bin/webdriver-manager start"`
#####In three different shell windows:#####
- npm run webdriver-start
- npm run serve.e2e
- npm run e2e


##Locators##
One if not the most important thing in E2E testing is finding the elements that you want to test in your view. You have many ways to do this. Most of them depend of your application. In order to get your elements, you will use a range of **Locators**.

Most of the time, you can find your elements by:

- Class name.
- Id.
- Model.
- Binding.









    




