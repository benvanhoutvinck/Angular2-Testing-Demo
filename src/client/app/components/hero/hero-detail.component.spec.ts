import { async, ComponentFixture, fakeAsync, inject, TestBed, tick } from '@angular/core/testing';

import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import {  click, newEvent  } from '../../frameworks/core/testing/index';
import { ActivatedRoute, Router} from '@angular/router';
import { ActivatedRouteStub } from '../../frameworks/core/testing/router-stubs';
import { RouterStub } from '../../frameworks/core/testing/router-stubs';

import { Hero }                from '../model/hero';
import { HeroDetailComponent } from '../hero/hero-detail.component';
import { HeroDetailService }   from './hero-detail.service';
import { HeroModule }          from './hero.module';

import { t } from '../../frameworks/test/index';

////// Testing Vars //////
let activatedRoute: ActivatedRouteStub;
let comp: HeroDetailComponent;
let fixture: ComponentFixture<HeroDetailComponent>;
let page: Page;

////// Tests //////
export function main() {
  t.describe('HeroDetailComponent', () => {
    beforeEach(() => {
      activatedRoute = new ActivatedRouteStub();
    });
    describe('with HeroModule setup', heroModuleSetup);
    describe('when override its provided HeroDetailService', overrideSetup);
    //describe('with FormsModule setup', formsModuleSetup);
    //describe('with SharedModule setup', sharedModuleSetup);
  });

}

////////////////////
function overrideSetup() {
  class StubHeroDetailService {
    testHero = new Hero(42, 'Test Hero');

    getHero(id: number | string): Promise<Hero>  {
      return Promise.resolve(true).then(() => Object.assign({}, this.testHero) );
    }

    saveHero(hero: Hero): Promise<Hero> {
      return Promise.resolve(true).then(() => Object.assign(this.testHero, hero) );
    }
  }

  // the `id` value is irrelevant because ignored by service stub
  beforeEach(() => activatedRoute.testParams = { id: 99999 } );

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports:   [ HeroModule ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRoute },
        { provide: Router,         useClass: RouterStub},
        // HeroDetailService at this level is IRRELEVANT!
        { provide: HeroDetailService, useValue: {} }
      ]
    })

    // Override component's own provider
      .overrideComponent(HeroDetailComponent, {
        set: {
          providers: [
            { provide: HeroDetailService, useClass: StubHeroDetailService }
          ]
        }
      })

      .compileComponents();
  }));

  let hds: StubHeroDetailService;

  beforeEach( async(() => {
    createComponent();
    // get the component's injected StubHeroDetailService
    hds = fixture.debugElement.injector.get(HeroDetailService);
  }));

  it('should display stub hero\'s name', () => {
    expect(page.nameDisplay.textContent).toBe(hds.testHero.name);
  });

  it('should save stub hero change', fakeAsync(() => {
    const origName = hds.testHero.name;
    const newName = 'New Name';

    page.nameInput.value = newName;
    page.nameInput.dispatchEvent(newEvent('input')); // tell Angular

    expect(comp.hero.name).toBe(newName, 'component hero has new name');
    expect(hds.testHero.name).toBe(origName, 'service hero unchanged before save');

    click(page.saveBtn);
    tick(); // wait for async save to complete
    expect(hds.testHero.name).toBe(newName, 'service hero has new name after save');
    expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
  }));

  it('fixture injected service is not the component injected service',
    inject([HeroDetailService], (service: HeroDetailService) => {

      expect(service).toEqual({}, 'service injected from fixture');
      expect(hds).toBeTruthy('service injected into component');
    }));
}

////////////////////
import { HEROES, FakeHeroService } from '../model/testing/index';
import { HeroService }             from '../model/hero.service';

const firstHero = HEROES[0];

function heroModuleSetup() {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HeroModule],
      //  declarations: [ HeroDetailComponent ], // NO!  DOUBLE DECLARATION
      providers: [
        {provide: ActivatedRoute, useValue: activatedRoute},
        {provide: HeroService, useClass: FakeHeroService},
        {provide: Router, useClass: RouterStub},
      ]
    })
      .compileComponents();
  }));

  describe('when navigate to existing hero', () => {
    let expectedHero: Hero;

    beforeEach( async(() => {
      expectedHero = firstHero;
      activatedRoute.testParams = { id: expectedHero.id };
      createComponent();
    }));

    it('should display that hero\'s name', () => {
      expect(page.nameDisplay.textContent).toBe(expectedHero.name);
    });

    it('should navigate when click cancel', () => {
      click(page.cancelBtn);
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    });

    it('should save when click save but not navigate immediately', () => {
      click(page.saveBtn);
      expect(page.saveSpy.calls.any()).toBe(true, 'HeroDetailService.save called');
      expect(page.navSpy.calls.any()).toBe(false, 'router.navigate not called');
    });

    it('should navigate when click save and save resolves', fakeAsync(() => {
      click(page.saveBtn);
      tick(); // wait for async save to complete
      expect(page.navSpy.calls.any()).toBe(true, 'router.navigate called');
    }));

    it('should convert hero name to Title Case', fakeAsync(() => {
      const inputName = 'quick BROWN  fox';
      const titleCaseName = 'Quick Brown  Fox';

      // simulate user entering new name into the input box
      page.nameInput.value = inputName;

      // dispatch a DOM event so that Angular learns of input value change.
      page.nameInput.dispatchEvent(newEvent('input'));

      // Tell Angular to update the output span through the title pipe
      fixture.detectChanges();

      expect(page.nameDisplay.textContent).toBe(titleCaseName);
    }));
  });
}


/////////// Helpers /////

/** Create the HeroDetailComponent, initialize it, set test variables  */
function createComponent() {
  fixture = TestBed.createComponent(HeroDetailComponent);
  comp    = fixture.componentInstance;
  page    = new Page();

  // 1st change detection triggers ngOnInit which gets a hero
  fixture.detectChanges();
  return fixture.whenStable().then(() => {
    // 2nd change detection displays the async-fetched hero
    fixture.detectChanges();
    page.addPageElements();
  });
}

class Page {
  gotoSpy: jasmine.Spy;
  navSpy: jasmine.Spy;
  saveSpy: jasmine.Spy;

  saveBtn: DebugElement;
  cancelBtn: DebugElement;
  nameDisplay: HTMLElement;
  nameInput: HTMLInputElement;

  constructor() {
    // Use component's injector to see the services it injected.
    const compInjector = fixture.debugElement.injector;
    const hds = compInjector.get(HeroDetailService);
    const router = compInjector.get(Router);

    this.gotoSpy = spyOn(comp, 'gotoList').and.callThrough();
    this.navSpy = spyOn(router, 'navigate');
    this.saveSpy = spyOn(hds, 'saveHero').and.callThrough();
  }

  /** Add page elements after hero arrives */
  addPageElements() {
    if (comp.hero) {
      // have a hero so these elements are now in the DOM
      const buttons = fixture.debugElement.queryAll(By.css('button'));
      this.saveBtn = buttons[0];
      this.cancelBtn = buttons[1];
      this.nameDisplay = fixture.debugElement.query(By.css('span')).nativeElement;
      this.nameInput = fixture.debugElement.query(By.css('input')).nativeElement;
    }
  }
}
/*
 Copyright 2016 Google Inc. All Rights Reserved.
 Use of this source code is governed by an MIT-style license that
 can be found in the LICENSE file at http://angular.io/license
 */
