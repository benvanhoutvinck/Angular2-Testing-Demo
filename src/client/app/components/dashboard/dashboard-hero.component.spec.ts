// angular
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import { By } from '@angular/platform-browser';
import {DebugElement} from "@angular/core";

// app
import {DashboardHeroComponent} from "./dashboard-hero.component";
import {Hero} from "../model/hero";
import { t } from '../../frameworks/test/index';

export function main() {

  let comp: DashboardHeroComponent;
  let expectedHero: Hero;
  let fixture: ComponentFixture<DashboardHeroComponent>;
  let heroEl: DebugElement;

  t.describe('@Component: DashboardHeroComponent when tested directly', () => {

    // async beforeEach
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [DashboardHeroComponent]
      })
        .compileComponents(); // compile template and css
    }));

    // synchronous beforeEach
    beforeEach(() => {
      fixture = TestBed.createComponent(DashboardHeroComponent);
      comp = fixture.componentInstance;

      heroEl = fixture.debugElement.query(By.css('.hero')); // find hero element

      // pretend that it was wired to something that supplied a hero
      expectedHero = new Hero(42, 'Test Name');
      comp.hero = expectedHero;
      fixture.detectChanges(); // trigger initial data binding
    });

    t.it('should display hero name', () => {
      const expectedPipedName = expectedHero.name;
      expect(heroEl.nativeElement.textContent).toContain(expectedPipedName);
    });


  });
}
