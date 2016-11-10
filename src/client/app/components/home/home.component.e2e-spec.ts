import { t, selectDropdownByValue } from '../../frameworks/test/index';

declare var browser: any, element: any, by: any;

t.describe('Home', function() {

  t.be(function() {
    browser.get('/');
  });

  t.it('should find the nested class', () => {
    let elem = element(by.css('.nested-class'));
    expect(elem.isPresent()).toBeTruthy();
  })

  t.it('should have correct h2', function() {
      t.e(element(by.css('atd-app atd-home h2')).getText()).toEqual('I love technology!');
  });

  t.it('should have an input', function() {
    t.e(element(by.css('atd-app atd-home form input')).isPresent()).toEqual(true);
  });

  t.it('should have a list of computer scientists', function() {
    t.e(element(by.css('atd-app atd-home ul')).getText())
      .toEqual('Edsger Dijkstra\nDonald Knuth\nAlan Turing\nGrace Hopper');
  });

  t.it('should add a name to the list using the form', function() {
    element(by.css('atd-app atd-home form input')).sendKeys('Tim Berners-Lee');
    element(by.css('atd-app atd-home form button')).click();
    t.e(element(by.css('atd-app atd-home ul')).getText())
      .toEqual('Edsger Dijkstra\nDonald Knuth\nAlan Turing\nGrace Hopper\nTim Berners-Lee');
  });

  // this works in development, but travis ci has timing issue with it
  // disabled just so travis doesn't complain
  t.xit('language switcher should change language', function() {
    t.e(element(by.css('atd-app atd-home h2')).getText()).toEqual('I love technology!');
    selectDropdownByValue('atd-app atd-toolbar lang-switcher select', 'fr', 500);
    t.e(element(by.css('atd-app atd-home h2')).getText()).toEqual(`J'adore la technologie !`);
    t.e(element(by.css('atd-app atd-home')).all(by.tagName('p')).first().getText())
      .toEqual(`En récompense, voici une liste de géniaux informaticiens :`);
  });

});
