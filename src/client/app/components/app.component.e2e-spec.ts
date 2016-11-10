import { t } from '../frameworks/test/index';

declare var browser: any, element: any, by: any;

t.describe('App', function() {

  t.be(function() {
    browser.get('/');
  });

  t.it('should have a title', function() {
    t.e(browser.getTitle()).toEqual('Angular 2 Seed Advanced');
  });

  t.it('should have <nav>', function() {
      t.e(element(by.css('atd-app atd-navbar nav')).isPresent()).toEqual(true);
  });

  t.it('should have correct nav text for Home', function() {
      t.e(element(by.css('atd-app atd-navbar nav a:first-child')).getText()).toEqual('Home');
  });

  t.it('should have correct nav text for About', function() {
      t.e(element(by.css('atd-app atd-navbar nav a:last-child')).getText()).toEqual('Github');
  });

  t.it('should contain a language switcher', function() {
    t.e(element(by.css('atd-app atd-toolbar lang-switcher')).isPresent()).toEqual(true);
    t.e(element.all(by.css('atd-app atd-toolbar lang-switcher option')).count()).toEqual(5);
  });

});
