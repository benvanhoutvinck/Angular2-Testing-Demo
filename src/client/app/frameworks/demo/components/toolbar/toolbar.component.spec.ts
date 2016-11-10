// angular
import {Component, DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import { TestBed, ComponentFixture, async} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// app
import { t } from '../../../test/index';
import { TEST_CORE_PROVIDERS } from '../../../core/testing/index';
import { ToolbarComponent } from './toolbar.component';

export function main() {

  let fixture: ComponentFixture<TestComponent>;
  let toolbarInstance;
  let de: DebugElement;
  let el: HTMLElement;

  t.describe('@Component: ToolbarComponent', () => {

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
      //toolbarInstance.title = 'testtitle';
      de = fixture.debugElement.query(By.css('h1')); // get the debug element
      //toolbarInstance = fixture.componentInstance;
      el = de.nativeElement; // and finally the HTML element
      //fixture.detectChanges(); // trigger initial data binding

    });

    t.it('should display original title', () => {
      fixture.detectChanges(); // trigger initial data binding
      t.e(el.textContent).toContain('Angular 2 Testing Demo :-)');
    })

    t.it('should display new title', () => {
      toolbarInstance.title = 'testtitle';
      fixture.detectChanges(); // trigger initial data binding
      t.e(el.textContent).toContain('testtitle');
    })

  });
}

@Component({
  selector: 'test-cmp',
  template: '<atd-toolbar></atd-toolbar>'
})
class TestComponent {

}
