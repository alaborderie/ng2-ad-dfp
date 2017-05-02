Angular 2 TypeScript Component
======================================

This component was written by Antoine Laborderie working at Lekooa

It is under MIT License

-----

## Installation

To install this library, run:

```bash
$ npm install ng2-ad-dfp --save
```

## Consuming your library

Once you have published your library to npm, you can import your library in any Angular application by running:

```bash
$ npm install ng2-ad-dfp
```

and then from your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { AdDFPComponent } from 'ng2-ad-dfp';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    // Specify your library as an import
    AdDFPComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once your library is imported, you can use its components, directives and pipes in your Angular application.


Display ad in a web app with a single line of code:

```typescript
<ad-dfp [type]="'banner'"></ad-dfp>
```

Settings !
-----

To set-up your settings you need to:

  - Define your DFP slots
  - Modify tags

Define your DFP Slots
-----

You need to copy paste the content of `defineAds()̀` into a file named "defineAds.js"

Now you have to fill the "tags" and the mapping as you want it (You can generate tags through Doubleclick's interface).

Then you should include it in your index.html.

Modify tags
-----

In the component, a function `getTag()` exists to get the right tag depending of the type of ad picked.

You should fill the lines with your own tags, generated through DFP

AdBlock detector
-----

The function `detectAdBlocker()` needs a script named "ads.js" included in your <i>index.html</i>

```html
<head>
  <script src="assets/script/ads.js"></script>
</head>
```
It will then detect when an AdBlocker is used and execute what is in the `showDetectedAdBlocker()` function
You probably want to display a message asking the user to put your web app in his whitelist.
