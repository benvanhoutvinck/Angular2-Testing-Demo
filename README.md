![Angular 2 Seed Advanced](https://d2wp4shknjcfjl.cloudfront.net/api/file/olEzxJQ2KcXrZHzbt9UA)![Angular 2 Seed Advanced Integrations](https://d2wp4shknjcfjl.cloudfront.net/api/file/SPLl77rSTuGZ7APrXizi)

[![Angular 2 Style Guide](https://mgechev.github.io/angular2-style-guide/images/badge.svg)](https://github.com/mgechev/angular2-style-guide)
[![Build Status](https://travis-ci.org/NathanWalker/angular-seed-advanced.svg?branch=master)](https://travis-ci.org/NathanWalker/angular-seed-advanced)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
[![Dependency Status](https://david-dm.org/NathanWalker/angular-seed-advanced.svg)](https://david-dm.org/NathanWalker/angular-seed-advanced)
[![devDependency Status](https://david-dm.org/NathanWalker/angular-seed-advanced/dev-status.svg)](https://david-dm.org/NathanWalker/angular-seed-advanced#info=devDependencies)
[![Stack Share](http://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](http://stackshare.io/NathanWalker/angular-seed-advanced)
[![Stories in Progress](https://badge.waffle.io/NathanWalker/angular-seed-advanced.png?label=in%20progress&title=Stories%20In%20Progress)](https://waffle.io/NathanWalker/angular-seed-advanced)

#### Considering [Angular 2](https://angular.io/) for a large project? Do you need i18n support? Enhanced testing support? Oh and building for multiple platforms too? Web, *native* Mobile (Android/iOS), and even Desktop (Mac, Windows and Linux)?  

This is an **advanced** seed project for Angular 2 apps based on [Minko Gechev's](https://github.com/mgechev) [angular-seed](https://github.com/mgechev/angular-seed) that expands on all of its great features to include core support for:

#### Integration with:
- [ngrx/store](https://github.com/ngrx/store) RxJS powered state management, inspired by **Redux**
- [ngrx/effects](https://github.com/ngrx/effects) Side effect model for @ngrx/store
- [ng2-translate](https://github.com/ocombe/ng2-translate) for i18n 
  - Usage is optional but on by default
  - Up to you and your team how you want to utilize it. It can be easily removed if not needed. 
- [angulartics2](https://github.com/angulartics/angulartics2) Vendor-agnostic analytics for Angular2 applications.
  - Out of box support for [Segment](https://segment.com/)
    - When using the seed, be sure to change your `write_key` [here](https://github.com/NathanWalker/angular-seed-advanced/blob/master/src/client/index.html#L24)
  - Can be changed to any vendor, [learn more here](https://github.com/angulartics/angulartics2#supported-providers)
- [lodash](https://lodash.com/) Helps reduce blocks of code down to single lines and enhances readability
- [NativeScript](https://www.nativescript.org/) cross platform mobile (w/ native UI) apps. [Setup instructions here](#nativescript-app).
- [Electron](http://electron.atom.io/) cross platform desktop apps (Mac, Windows and Linux). [Setup instructions here](#electron-app).

| ![Multiple Platforms](https://d2wp4shknjcfjl.cloudfront.net/api/file/ihp3WyiqS1WdRYaBEYKn) |
| :---: |
| *The zen of multiple platforms.* Chrome, Android and iPhone all running the same code. |

| ![Desktop](https://d2wp4shknjcfjl.cloudfront.net/api/file/1O4FRGsSHS8g0Lz3EKNy) |
| :---: |
| *Programming Nirvana.* Mac and Windows desktop both running the same code. |

# Table of Contents

- [Enhanced development workflow](#enhanced-development-workflow)
- [Enhanced testing support options](#enhanced-testing-support-options)
- [Prerequisites](#prerequisites)
- [Usage](#usage)
- [Special note about AoT](https://github.com/NathanWalker/angular-seed-advanced#special-note-about-aot)
- [NativeScript App](#nativescript-app)
- [Electron App](#electron-app)
- [Testing](#testing)
- [Framework How-Tos](#framework-how-tos)
- [Web Configuration Options](#web-configuration-options)
- [Change Detection OnPush Note](#change-detection-onpush-note)
- [General Best Practice Guide to Sharing Code](#general-best-practice-guide-to-sharing-code)
- [Feature Branches](#feature-branches)
- [Integration Guides](https://github.com/NathanWalker/angular-seed-advanced/wiki)
- [How best to use for your project](#how-best-to-use-for-your-project)
- [Contributing](#contributing)
- [License](#license)

#### Enhanced development workflow
- Decorators for components which reduce boilerplate for common component setups
- Shared code can be found in `frameworks`:
  - `core`: foundation layer (decorators and low-level services)
  - `analytics`: analytics provided by [Segment](https://segment.com/)
    - Only reports data in **production** build
  - `i18n`: internationalization features
  - `electron`: [Electron](http://electron.atom.io/) specific code
  - `sample`: Just a sample module providing some components and services
  - `test`: test specific code providing conveniences to make testing your code easier and faster 

#### Enhanced testing support options
- mocks for various services
- configurable provider blocks for easy test setup of common application providers
  - tired of setting up similar providers over and over again for different tests?
  - configure a reusable test provider which can be configured on a case-by-base basis
  - see [example here](https://github.com/NathanWalker/angular-seed-advanced/blob/master/src/client/app/frameworks/core/testing/providers/core.ts)
- helpers for end-to-end (e2e, integration) tests
- convenient shorthand to reduce test setup boilerplate and enhance speed of writing tests
  - are your test cases buried by multiple import lines requiring you to scroll just to get to the substance of the test?
  - removes noise allowing you to better focus on the substance of the test
  - provides full intellisense support
  - allows your team to add unique shorthands for various testing scenarios specific to your application needs
  - plays nice with `tslint` options like `"no-unused-variable": true` as the api hangs off a plain `Object` instead of globals 
    - what's the value of that you ask? have you ever isolated a test with `iit` or `ddescribe` but didn't import those or vice versa, used `iit` leaving an unused `it` now in your tests? yeah, `tslint` will be all over you :/
    - avoids `unused` variable warnings altogether in tests since you are always using a valid key from the shorthand `Object`
  - see [example here](https://github.com/NathanWalker/angular-seed-advanced/blob/master/src/client/app/frameworks/test/shorthand/ng2-jasmine.ts)
  
**Advice**: If your project is intended to target a single platform (i.e, web only), then [angular-seed](https://github.com/mgechev/angular-seed) is likely more than suitable for your needs. However if your project goals are to target multiple platforms (web, native mobile and native desktop), with powerful out of the box library support and highly configurable/flexible testing options, then you might want to keep reading.

Additionally, this seed is intended to push a couple boundaries so if you see dependencies that are *bleeding edge*, this is intentional.

### Prerequisites

* node v5.x.x or higher and npm 3 or higher.

* To run the NativeScript app:

```
npm install -g nativescript
npm install -g typescript
```

## Usage


```bash
git clone --depth 1 https://github.com/NathanWalker/angular-seed-advanced.git
cd angular-seed-advanced

# install the project's dependencies
npm install
# watches your files and uses livereload by default
npm start
# api document for the app
npm run serve.docs

# to start deving with livereload site and coverage as well as continuous testing
npm run start.deving

# dev build
npm run build.dev
# prod build
npm run build.prod
# prod build with AoT compilation
npm run build.prod.exp
```

## Special Note About AoT

When using `npm run build.prod.exp` for AoT builds, please consider the following:

Currently you cannot use custom component decorators with AoT compilation. This may change in the future but for now you can use this pattern for when you need to create AoT builds for the web:

```
import { Component } from '@angular/core';
import { BaseComponent } from '../frameworks/core/index';

// @BaseComponent({   // just comment this out and use Component from 'angular/core'
@Component({
  // etc.
```

After doing the above, running AoT build via `npm run build.prod.exp` will succeed. :)

`BaseComponent` custom component decorator does the auto `templateUrl` switching to use {N} views when running in the {N} app therefore you don't need it when creating AoT builds for the web. However just note that when going back to run your {N} app, you should comment back in the `BaseComponent`. Again this temporary inconvenience may be unnecessary in the future.

## NativeScript App

#### Setup

```
npm install -g nativescript 
```

#### Dev Workflow

You can make changes to files in `src/client` or `nativescript` folders. A symbolic link exists between the web `src/client` and the `nativescript` folder so changes in either location are mirrored because they are the same directory inside.

Create `.tns.html` and `.tns.css` NativeScript view files for every web component view file you have. You will see an example of the `app.component.html` as a [NativeScript view file here](https://github.com/NathanWalker/angular-seed-advanced/blob/master/src/client/app/components/app.component.tns.html).

#### Run

```
iOS:                      npm run start.ios
iOS (livesync emulator):  npm run start.livesync.ios
iOS (livesync device):    npm run start.livesync.ios.device

// or...

Android:                      npm run start.android
Android (livesync emulator):  npm run start.livesync.android
Android (livesync device):    npm run start.livesync.android.device
```

* Requires an image setup via AVD Manager. [Learn more here](http://developer.android.com/intl/zh-tw/tools/devices/managing-avds.html) and [here](https://github.com/NativeScript/nativescript-cli#the-commands).

OR...

* [GenyMotion Android Emulator](https://www.genymotion.com/)

##### Building with Webpack for release builds

You can greatly reduce the final size of your NativeScript app by the following:

```
cd nativescript
npm i nativescript-dev-webpack --save-dev
```
Then you will need to modify your components to *not* use `moduleId: module.id` and change `templateUrl` to true relative app, for example:

before:

```
@BaseComponent({
  moduleId: module.id,
  selector: 'sd-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
```
after:

```
@BaseComponent({
  // moduleId: module.id,
  selector: 'sd-home',
  templateUrl: './app/components/home/home.component.html',
  styleUrls: ['./app/components/home/home.component.css']
})
```

Then to build:

Ensure you are in the `nativescript` directory when running these commands.

* iOS: `WEBPACK_OPTS="--display-error-details" tns build ios --bundle`
* Android: `WEBPACK_OPTS="--display-error-details" tns build android --bundle`

Notice your final build will be drastically smaller. In some cases 120 MB -> ~28 MB. 👍 

## Electron App

#### Develop

```
Mac:      npm run start.desktop
Windows:  npm run start.desktop.windows
```

#### Develop with livesync
```
Mac:      npm run start.livesync.desktop
Windows:  npm run start.livesync.desktop.windows
```

#### Release: Package Electron App for Mac, Windows or Linux

```
Mac:      npm run build.desktop.mac
Windows:  npm run build.desktop.windows
Linux:    npm run build.desktop.linux
```

## Testing

```bash
npm test

# Development. Your app will be watched by karma
# on each change all your specs will be executed.
npm run test.watch
# NB: The command above might fail with a "EMFILE: too many open files" error.
# Some OS have a small limit of opened file descriptors (256) by default
# and will result in the EMFILE error.
# You can raise the maximum of file descriptors by running the command below:
ulimit -n 10480


# code coverage (istanbul)
# auto-generated at the end of `npm test`
# view coverage report:
npm run serve.coverage

# e2e (aka. end-to-end, integration) - In three different shell windows
# Make sure you don't have a global instance of Protractor

# npm install webdriver-manager <- Install this first for e2e testing
# npm run webdriver-update <- You will need to run this the first time
npm run webdriver-start
npm run serve.e2e
npm run e2e

# e2e live mode - Protractor interactive mode
# Instead of last command above, you can use:
npm run e2e.live
```
You can learn more about [Protractor Interactive Mode here](https://github.com/angular/protractor/blob/master/docs/debugging.md#testing-out-protractor-interactively)

## Web Configuration Options

Default application server configuration

```javascript
var PORT             = 5555;
var LIVE_RELOAD_PORT = 4002;
var DOCS_PORT        = 4003;
var APP_BASE         = '/';
```

Configure at runtime

```bash
npm start -- --port 8080 --reload-port 4000 --base /my-app/
```

## Framework How-Tos

### i18n

* how to add a language?
  - `src/client/assets/i18n/`
    - add `[language code].json` (copy existing one and adapt the translation strings)
  - `src/client/app/frameworks/sample/services/app-config.spec.ts`
    - fix test
  - `src/client/app/frameworks/sample/services/app-config.ts`
    - add language to `SUPPORTED_LANGUAGES`
  - `src/client/app/frameworks/i18n/components/lang-switcher.component.spec.ts`
    - fix test

## Change Detection OnPush Note

*Please Note:* The seed uses Angular's `ChangeDetectionStrategy.OnPush` by default which requires some understanding of immutability and one-way data flows. Please check out the following resources to learn more:

* http://blog.thoughtram.io/angular/2016/02/22/angular-2-change-detection-explained.html
* http://victorsavkin.com/post/110170125256/change-detection-in-angular-2
* http://www.syntaxsuccess.com/viewarticle/change-detection-in-angular-2.0
* http://ngcourse.rangle.io/handout/change-detection/change_detection_strategy_onpush.html

If you experience issues with changes not occuring in your views, you can disable this by commenting out [these lines](https://github.com/NathanWalker/angular-seed-advanced/blob/master/src/client/app/frameworks/core/decorators/utils.ts#L43-L48). The seed uses `OnPush` by default because it  provides optimal performance and if you decide to turn it off while developing your application, you can always turn it back on when you're ready to refactor your data services to utilize `OnPush` properly.

## General Best Practice Guide to Sharing Code 

There’s actually only a few things to keep in mind when sharing code between web/mobile. The seed does take care of quite a few of those things but here’s a brief list:

* Don’t import {N} modules into your components/services. {N} modules can only be used inside the {N} app therefore cannot be shared. To get around this, use `OpaqueTokens` which is a fancy name for something quite simple. [Learn more here](http://blog.thoughtram.io/angular/2016/05/23/opaque-tokens-in-angular-2.html). A great example of how to integrate 2 different plugins (1 for web, 1 for {N}) and share all the code exists in [this wiki article: How to integrate Firebase across all platforms](https://github.com/NathanWalker/angular-seed-advanced/wiki/How-to-integrate-Firebase-across-all-platforms-(web-nativescript-desktop)) written by the awesome [Scott Lowe](https://twitter.com/scott_d_lowe).
* Use the conditional hooks provided by the seed in shared methods where you may need to handle something differently in {N} than you do on the web. For example, see [here](https://github.com/NathanWalker/angular-seed-advanced/blob/master/src/client/app/frameworks/i18n/components/lang-switcher.component.ts#L35-L41).
* Don’t use window global. Inject the `WindowService` provided by the seed instead. This includes usage of `alert`, `confirm`, etc. For example:

If you were thinking about doing: `alert('Something happened!');`, *Don't*.
Instead inject `WindowService`:
```
constructor(private win: WindowService) {}

public userAction() {
  if (success) {
    // do stuff
  } else {
    this.win.alert('Something happened!');
  }
}
```

This ensures that when the same code is run in the {N} app, the native `dialogs` module will be used.

* Lastly, understand this video: http://www.nativescriptsnacks.com/videos/2016/06/13/zoned-callbacks.html … As far as dealing with {N} and 3rd party plugins, you want to understand that.

The advice I like to give is:

> Code with web mentality first. Then provide the native capability using Angular’s `{provide: SomeWebService, useClass: SomeNativeService }` during bootstrap.

There are some cases where you may want to use `useValue` vs. `useClass`, and other times may need to use `useFactory`. Read [the Angular docs here to learn more about which you may need for your use case](https://angular.io/docs/ts/latest/cookbook/dependency-injection.html#!#provide).

## Feature Branches

Several branches exist with certain features integrated:

* [ui-router-ng2](https://github.com/NathanWalker/angular-seed-advanced/tree/ui-router)

## How best to use for your project

#### Setup

*NOTE*: This should be done first before you start making any changes and building out your project. Not doing so will likely result in dificulty when trying to merge in upstream changes later.

1. Download a zip of the seed. (**Do not fork**)
2. `npm run git.setup` - This will initialize `git` as well as setup `upstream` properly.
3. `git remote add origin ...your private repo...`
4. `npm run git.prepare` - This will prepare git to handle the merge
5. `npm run git.merge` - This will fetch upstream and run the first merge (*Important)
  * IMPORTANT: You will see a wall of Conflicts after doing above (a Conflict for every single file). This is normal. There actually will not be any problematic conflicts as it's just reporting every single file which both sides (`upstream` and your first commit) added.
  * IMPORTANT: If you see `unknown option --allow-unrelated-histories` either upgrade git to 2.9+ or use `npm run git.merge.legacy`
6. `git add .; git commit -m'ready'`. **Yes**, you will be committing all those conflicts, which actually are not a problem in this 1 time case.
7. Now you have `git` setup and ready to develop your application as well as merge in upstream changes in the future.
8. `npm install` (and all other usage docs in this `README` apply)
9. Create a new `framework` for your application in `src/client/app/frameworks` to build your codebase out. Say your app is called `AwesomeApp`, then create `awesomeapp` and start building out all your components and services in there. Create other frameworks as you see fit to organize.
10. If you don't want an integration that comes out of box with this seed; for example. let's say you don't want to use i18n. Then just delete the `i18n`, remove `ng2-translate` as dependency root `package.json` and `nativescript/package.json`. Then remove any references to `i18n` throughout.

#### Merging latest upstream changes

1. `npm run git.merge.preview` - This will fetch `upstream` and show you how the merge would look
  * If you see `unknown option --allow-unrelated-histories` either upgrade git to 2.9+ or use `npm run git.merge.legacy.preview`
2. `npm run git.merge` - This will actually do the merge
  * If you see `unknown option --allow-unrelated-histories` either upgrade git to 2.9+ or use `npm run git.merge.legacy`
3. Handle any conflicts to get latest upstream into your application.
4. Continue building your app.

You can read more about [syncing a fork here](https://help.github.com/articles/syncing-a-fork/).

If you have any suggestions to this workflow, please post [here](https://github.com/NathanWalker/angular-seed-advanced/issues).

## Contributing

Please see the [CONTRIBUTING](https://github.com/NathanWalker/angular-seed-advanced/blob/master/CONTRIBUTING.md) file for guidelines.

# Awesome Contributors

[<img alt="mgechev" src="https://avatars.githubusercontent.com/u/455023?v=3&s=117" width="117">](https://github.com/mgechev) |[<img alt="ludohenin" src="https://avatars.githubusercontent.com/u/1011516?v=3&s=117" width="117">](https://github.com/ludohenin) |[<img alt="NathanWalker" src="https://avatars.githubusercontent.com/u/457187?v=3&s=117" width="117">](https://github.com/NathanWalker) |[<img alt="d3viant0ne" src="https://avatars.githubusercontent.com/u/8420490?v=3&s=117" width="117">](https://github.com/d3viant0ne) |[<img alt="Shyam-Chen" src="https://avatars.githubusercontent.com/u/13535256?v=3&s=117" width="117">](https://github.com/Shyam-Chen) |[<img alt="tarlepp" src="https://avatars.githubusercontent.com/u/595561?v=3&s=117" width="117">](https://github.com/tarlepp) |
:---: |:---: |:---: |:---: |:---: |:---: |
[mgechev](https://github.com/mgechev) |[ludohenin](https://github.com/ludohenin) |[NathanWalker](https://github.com/NathanWalker) |[d3viant0ne](https://github.com/d3viant0ne) |[Shyam-Chen](https://github.com/Shyam-Chen) |[tarlepp](https://github.com/tarlepp) |

[<img alt="Nightapes" src="https://avatars.githubusercontent.com/u/15911153?v=3&s=117" width="117">](https://github.com/Nightapes) |[<img alt="TheDonDope" src="https://avatars.githubusercontent.com/u/1188033?v=3&s=117" width="117">](https://github.com/TheDonDope) |[<img alt="nareshbhatia" src="https://avatars.githubusercontent.com/u/1220198?v=3&s=117" width="117">](https://github.com/nareshbhatia) |[<img alt="hank-ehly" src="https://avatars.githubusercontent.com/u/11639738?v=3&s=117" width="117">](https://github.com/hank-ehly) |[<img alt="kiuka" src="https://avatars.githubusercontent.com/u/11283191?v=3&s=117" width="117">](https://github.com/kiuka) |[<img alt="daniru" src="https://avatars.githubusercontent.com/u/2070853?v=3&s=117" width="117">](https://github.com/daniru) |
:---: |:---: |:---: |:---: |:---: |:---: |
[Nightapes](https://github.com/Nightapes) |[TheDonDope](https://github.com/TheDonDope) |[nareshbhatia](https://github.com/nareshbhatia) |[hank-ehly](https://github.com/hank-ehly) |[kiuka](https://github.com/kiuka) |[daniru](https://github.com/daniru) |

[<img alt="vyakymenko" src="https://avatars.githubusercontent.com/u/7300673?v=3&s=117" width="117">](https://github.com/vyakymenko) |[<img alt="jesperronn" src="https://avatars.githubusercontent.com/u/6267?v=3&s=117" width="117">](https://github.com/jesperronn) |[<img alt="njs50" src="https://avatars.githubusercontent.com/u/55112?v=3&s=117" width="117">](https://github.com/njs50) |[<img alt="sasikumardr" src="https://avatars.githubusercontent.com/u/1760104?v=3&s=117" width="117">](https://github.com/sasikumardr) |[<img alt="aboeglin" src="https://avatars.githubusercontent.com/u/8297302?v=3&s=117" width="117">](https://github.com/aboeglin) |[<img alt="ivannugo" src="https://avatars.githubusercontent.com/u/8823899?v=3&s=117" width="117">](https://github.com/ivannugo) |
:---: |:---: |:---: |:---: |:---: |:---: |
[vyakymenko](https://github.com/vyakymenko) |[jesperronn](https://github.com/jesperronn) |[njs50](https://github.com/njs50) |[sasikumardr](https://github.com/sasikumardr) |[aboeglin](https://github.com/aboeglin) |[ivannugo](https://github.com/ivannugo) |

[<img alt="ryzy" src="https://avatars.githubusercontent.com/u/994940?v=3&s=117" width="117">](https://github.com/ryzy) |[<img alt="m-abs" src="https://avatars.githubusercontent.com/u/1348705?v=3&s=117" width="117">](https://github.com/m-abs) |[<img alt="JakePartusch" src="https://avatars.githubusercontent.com/u/6424140?v=3&s=117" width="117">](https://github.com/JakePartusch) |[<img alt="gkalpak" src="https://avatars.githubusercontent.com/u/8604205?v=3&s=117" width="117">](https://github.com/gkalpak) |[<img alt="jvitor83" src="https://avatars.githubusercontent.com/u/3493339?v=3&s=117" width="117">](https://github.com/jvitor83) |[<img alt="pgrzeszczak" src="https://avatars.githubusercontent.com/u/3300099?v=3&s=117" width="117">](https://github.com/pgrzeszczak) |
:---: |:---: |:---: |:---: |:---: |:---: |
[ryzy](https://github.com/ryzy) |[m-abs](https://github.com/m-abs) |[JakePartusch](https://github.com/JakePartusch) |[gkalpak](https://github.com/gkalpak) |[jvitor83](https://github.com/jvitor83) |[pgrzeszczak](https://github.com/pgrzeszczak) |

[<img alt="sfabriece" src="https://avatars.githubusercontent.com/u/3108592?v=3&s=117" width="117">](https://github.com/sfabriece) |[<img alt="eppsilon" src="https://avatars.githubusercontent.com/u/5643?v=3&s=117" width="117">](https://github.com/eppsilon) |[<img alt="e-oz" src="https://avatars.githubusercontent.com/u/526352?v=3&s=117" width="117">](https://github.com/e-oz) |[<img alt="natarajanmca11" src="https://avatars.githubusercontent.com/u/9244766?v=3&s=117" width="117">](https://github.com/natarajanmca11) |[<img alt="jerryorta-dev" src="https://avatars.githubusercontent.com/u/341155?v=3&s=117" width="117">](https://github.com/jerryorta-dev) |[<img alt="domfarolino" src="https://avatars.githubusercontent.com/u/9669289?v=3&s=117" width="117">](https://github.com/domfarolino) |
:---: |:---: |:---: |:---: |:---: |:---: |
[sfabriece](https://github.com/sfabriece) |[eppsilon](https://github.com/eppsilon) |[e-oz](https://github.com/e-oz) |[natarajanmca11](https://github.com/natarajanmca11) |[jerryorta-dev](https://github.com/jerryorta-dev) |[domfarolino](https://github.com/domfarolino) |

[<img alt="larsthorup" src="https://avatars.githubusercontent.com/u/1202959?v=3&s=117" width="117">](https://github.com/larsthorup) |[<img alt="JayKan" src="https://avatars.githubusercontent.com/u/1400300?v=3&s=117" width="117">](https://github.com/JayKan) |[<img alt="LuxDie" src="https://avatars.githubusercontent.com/u/12536671?v=3&s=117" width="117">](https://github.com/LuxDie) |[<img alt="robstoll" src="https://avatars.githubusercontent.com/u/5557885?v=3&s=117" width="117">](https://github.com/robstoll) |[<img alt="amedinavalencia" src="https://avatars.githubusercontent.com/u/21317797?v=3&s=117" width="117">](https://github.com/amedinavalencia) |[<img alt="tsm91" src="https://avatars.githubusercontent.com/u/4459551?v=3&s=117" width="117">](https://github.com/tsm91) |
:---: |:---: |:---: |:---: |:---: |:---: |
[larsthorup](https://github.com/larsthorup) |[JayKan](https://github.com/JayKan) |[LuxDie](https://github.com/LuxDie) |[robstoll](https://github.com/robstoll) |[amedinavalencia](https://github.com/amedinavalencia) |[tsm91](https://github.com/tsm91) |

[<img alt="juristr" src="https://avatars.githubusercontent.com/u/542458?v=3&s=117" width="117">](https://github.com/juristr) |[<img alt="JohnCashmore" src="https://avatars.githubusercontent.com/u/2050794?v=3&s=117" width="117">](https://github.com/JohnCashmore) |[<img alt="ouq77" src="https://avatars.githubusercontent.com/u/1796191?v=3&s=117" width="117">](https://github.com/ouq77) |[<img alt="devanp92" src="https://avatars.githubusercontent.com/u/4533277?v=3&s=117" width="117">](https://github.com/devanp92) |[<img alt="evanplaice" src="https://avatars.githubusercontent.com/u/303159?v=3&s=117" width="117">](https://github.com/evanplaice) |[<img alt="hAWKdv" src="https://avatars.githubusercontent.com/u/4449497?v=3&s=117" width="117">](https://github.com/hAWKdv) |
:---: |:---: |:---: |:---: |:---: |:---: |
[juristr](https://github.com/juristr) |[JohnCashmore](https://github.com/JohnCashmore) |[ouq77](https://github.com/ouq77) |[devanp92](https://github.com/devanp92) |[evanplaice](https://github.com/evanplaice) |[hAWKdv](https://github.com/hAWKdv) |

[<img alt="c-ice" src="https://avatars.githubusercontent.com/u/347238?v=3&s=117" width="117">](https://github.com/c-ice) |[<img alt="markharding" src="https://avatars.githubusercontent.com/u/851436?v=3&s=117" width="117">](https://github.com/markharding) |[<img alt="markwhitfeld" src="https://avatars.githubusercontent.com/u/1948265?v=3&s=117" width="117">](https://github.com/markwhitfeld) |[<img alt="ojacquemart" src="https://avatars.githubusercontent.com/u/1189345?v=3&s=117" width="117">](https://github.com/ojacquemart) |[<img alt="tiagomapmarques" src="https://avatars.githubusercontent.com/u/704002?v=3&s=117" width="117">](https://github.com/tiagomapmarques) |[<img alt="TuiKiken" src="https://avatars.githubusercontent.com/u/959821?v=3&s=117" width="117">](https://github.com/TuiKiken) |
:---: |:---: |:---: |:---: |:---: |:---: |
[c-ice](https://github.com/c-ice) |[markharding](https://github.com/markharding) |[markwhitfeld](https://github.com/markwhitfeld) |[ojacquemart](https://github.com/ojacquemart) |[tiagomapmarques](https://github.com/tiagomapmarques) |[TuiKiken](https://github.com/TuiKiken) |

[<img alt="gotenxds" src="https://avatars.githubusercontent.com/u/3519520?v=3&s=117" width="117">](https://github.com/gotenxds) |[<img alt="edud69" src="https://avatars.githubusercontent.com/u/1514745?v=3&s=117" width="117">](https://github.com/edud69) |[<img alt="turbohappy" src="https://avatars.githubusercontent.com/u/437299?v=3&s=117" width="117">](https://github.com/turbohappy) |[<img alt="kbrandwijk" src="https://avatars.githubusercontent.com/u/852069?v=3&s=117" width="117">](https://github.com/kbrandwijk) |[<img alt="troyanskiy" src="https://avatars.githubusercontent.com/u/1538862?v=3&s=117" width="117">](https://github.com/troyanskiy) |[<img alt="robbatt" src="https://avatars.githubusercontent.com/u/1379424?v=3&s=117" width="117">](https://github.com/robbatt) |
:---: |:---: |:---: |:---: |:---: |:---: |
[gotenxds](https://github.com/gotenxds) |[edud69](https://github.com/edud69) |[turbohappy](https://github.com/turbohappy) |[kbrandwijk](https://github.com/kbrandwijk) |[troyanskiy](https://github.com/troyanskiy) |[robbatt](https://github.com/robbatt) |

[<img alt="Bigous" src="https://avatars.githubusercontent.com/u/6886560?v=3&s=117" width="117">](https://github.com/Bigous) |[<img alt="ip512" src="https://avatars.githubusercontent.com/u/1699735?v=3&s=117" width="117">](https://github.com/ip512) |[<img alt="Green-Cat" src="https://avatars.githubusercontent.com/u/3328823?v=3&s=117" width="117">](https://github.com/Green-Cat) |[<img alt="Yonet" src="https://avatars.githubusercontent.com/u/3523671?v=3&s=117" width="117">](https://github.com/Yonet) |[<img alt="divramod" src="https://avatars.githubusercontent.com/u/1331662?v=3&s=117" width="117">](https://github.com/divramod) |[<img alt="daixtrose" src="https://avatars.githubusercontent.com/u/5588692?v=3&s=117" width="117">](https://github.com/daixtrose) |
:---: |:---: |:---: |:---: |:---: |:---: |
[Bigous](https://github.com/Bigous) |[ip512](https://github.com/ip512) |[Green-Cat](https://github.com/Green-Cat) |[Yonet](https://github.com/Yonet) |[divramod](https://github.com/divramod) |[daixtrose](https://github.com/daixtrose) |

[<img alt="taguan" src="https://avatars.githubusercontent.com/u/1026937?v=3&s=117" width="117">](https://github.com/taguan) |[<img alt="bbarry" src="https://avatars.githubusercontent.com/u/84951?v=3&s=117" width="117">](https://github.com/bbarry) |[<img alt="urmaul" src="https://avatars.githubusercontent.com/u/1838544?v=3&s=117" width="117">](https://github.com/urmaul) |[<img alt="yassirh" src="https://avatars.githubusercontent.com/u/4649139?v=3&s=117" width="117">](https://github.com/yassirh) |[<img alt="brendanbenson" src="https://avatars.githubusercontent.com/u/866866?v=3&s=117" width="117">](https://github.com/brendanbenson) |[<img alt="brian428" src="https://avatars.githubusercontent.com/u/140338?v=3&s=117" width="117">](https://github.com/brian428) |
:---: |:---: |:---: |:---: |:---: |:---: |
[taguan](https://github.com/taguan) |[bbarry](https://github.com/bbarry) |[urmaul](https://github.com/urmaul) |[yassirh](https://github.com/yassirh) |[brendanbenson](https://github.com/brendanbenson) |[brian428](https://github.com/brian428) |

[<img alt="briantopping" src="https://avatars.githubusercontent.com/u/158115?v=3&s=117" width="117">](https://github.com/briantopping) |[<img alt="ckapilla" src="https://avatars.githubusercontent.com/u/451875?v=3&s=117" width="117">](https://github.com/ckapilla) |[<img alt="cadriel" src="https://avatars.githubusercontent.com/u/205520?v=3&s=117" width="117">](https://github.com/cadriel) |[<img alt="dszymczuk" src="https://avatars.githubusercontent.com/u/539352?v=3&s=117" width="117">](https://github.com/dszymczuk) |[<img alt="dmurat" src="https://avatars.githubusercontent.com/u/470930?v=3&s=117" width="117">](https://github.com/dmurat) |[<img alt="peah90" src="https://avatars.githubusercontent.com/u/4435255?v=3&s=117" width="117">](https://github.com/peah90) |
:---: |:---: |:---: |:---: |:---: |:---: |
[briantopping](https://github.com/briantopping) |[ckapilla](https://github.com/ckapilla) |[cadriel](https://github.com/cadriel) |[dszymczuk](https://github.com/dszymczuk) |[dmurat](https://github.com/dmurat) |[peah90](https://github.com/peah90) |

[<img alt="dstockhammer" src="https://avatars.githubusercontent.com/u/1156637?v=3&s=117" width="117">](https://github.com/dstockhammer) |[<img alt="dwido" src="https://avatars.githubusercontent.com/u/154235?v=3&s=117" width="117">](https://github.com/dwido) |[<img alt="dcsw" src="https://avatars.githubusercontent.com/u/5479057?v=3&s=117" width="117">](https://github.com/dcsw) |[<img alt="totev" src="https://avatars.githubusercontent.com/u/4454638?v=3&s=117" width="117">](https://github.com/totev) |[<img alt="nosachamos" src="https://avatars.githubusercontent.com/u/1261686?v=3&s=117" width="117">](https://github.com/nosachamos) |[<img alt="ericli1018" src="https://avatars.githubusercontent.com/u/8234413?v=3&s=117" width="117">](https://github.com/ericli1018) |
:---: |:---: |:---: |:---: |:---: |:---: |
[dstockhammer](https://github.com/dstockhammer) |[dwido](https://github.com/dwido) |[dcsw](https://github.com/dcsw) |[totev](https://github.com/totev) |[nosachamos](https://github.com/nosachamos) |[ericli1018](https://github.com/ericli1018) |

[<img alt="koodikindral" src="https://avatars.githubusercontent.com/u/6285484?v=3&s=117" width="117">](https://github.com/koodikindral) |[<img alt="amaltsev" src="https://avatars.githubusercontent.com/u/2480962?v=3&s=117" width="117">](https://github.com/amaltsev) |[<img alt="Falinor" src="https://avatars.githubusercontent.com/u/9626158?v=3&s=117" width="117">](https://github.com/Falinor) |[<img alt="hpinsley" src="https://avatars.githubusercontent.com/u/750098?v=3&s=117" width="117">](https://github.com/hpinsley) |[<img alt="NN77" src="https://avatars.githubusercontent.com/u/3319904?v=3&s=117" width="117">](https://github.com/NN77) |[<img alt="jeffbcross" src="https://avatars.githubusercontent.com/u/463703?v=3&s=117" width="117">](https://github.com/jeffbcross) |
:---: |:---: |:---: |:---: |:---: |:---: |
[koodikindral](https://github.com/koodikindral) |[amaltsev](https://github.com/amaltsev) |[Falinor](https://github.com/Falinor) |[hpinsley](https://github.com/hpinsley) |[NN77](https://github.com/NN77) |[jeffbcross](https://github.com/jeffbcross) |

[<img alt="Jimmysh" src="https://avatars.githubusercontent.com/u/230652?v=3&s=117" width="117">](https://github.com/Jimmysh) |[<img alt="Drane" src="https://avatars.githubusercontent.com/u/389499?v=3&s=117" width="117">](https://github.com/Drane) |[<img alt="johnjelinek" src="https://avatars.githubusercontent.com/u/873610?v=3&s=117" width="117">](https://github.com/johnjelinek) |[<img alt="fourctv" src="https://avatars.githubusercontent.com/u/15777910?v=3&s=117" width="117">](https://github.com/fourctv) |[<img alt="JunusErgin" src="https://avatars.githubusercontent.com/u/7281463?v=3&s=117" width="117">](https://github.com/JunusErgin) |[<img alt="justindujardin" src="https://avatars.githubusercontent.com/u/101493?v=3&s=117" width="117">](https://github.com/justindujardin) |
:---: |:---: |:---: |:---: |:---: |:---: |
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




####Test a component inside a test host component####

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


- Worksheet gedeeltelijk gemaakt en dan weggaan checken of deze is aangemaakt
- Service -> dealer met contract tbr -> vehicle kiezen en layoutconfirm == false -> dan moet confirm pagina weergegeven worden.









    





