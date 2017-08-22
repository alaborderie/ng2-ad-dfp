# Angular 2 Component

This component creates and displays ads for DoubleClick for Publishers in your Angular2 project.
All you have to do is install it, include it in your app.module.ts, define your settings in a json file, and insert a ` <ad-dfp [type]="'banner'"></ad-dfp> ` in any page.html you want.

-----

Check my [article](https://medium.com/@antoine.laborderie/doubleclick-ads-in-angular-2-based-project-bbd53b425494) on Medium about this component !

-----

## Installation

_____
You should first include in your `index.html` file's headers this script:
`<script async='async' src='https://www.googletagservices.com/tag/js/gpt.js'></script>`
_____

To install this library, run:

```bash
$ npm install ng2-ad-dfp --save
```

and then from your Angular `AppModule`:

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import your library
import { AdDFPComponent } from 'ng2-ad-dfp';

@NgModule({
  declarations: [
    AppComponent,

    // Specify your library as a declaration
    AdDFPComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Once the library you have to define some settings

## Settings

To set-up your settings you need to create a settings file.

In your project, create a settings.json like: <b>src/assets/settings/settings.json</b>

It should look like this:

```json
{
  "network": 00000000,
  "tags": {
    "banner": 00000000,
    "inter": 00000000
  },
  "ID": {
    "banner": " ",
    "inter": " "
  },
  "mapping": {
    "mobile": {
      "width": 320,
      "height": 50
    },
    "tablet": {
      "width": 728,
      "height": 90
    },
    "desktop": {
      "width": 1024,
      "height": 120
    }
  },
  "adBlockDetector": false
}
```

ID is the ID of your ad-unit defined in DoubleClick.

If you do not wish to use a mapping just fill all the fields with the same values.

Mapping is done this way : 
  - Mobile is   >=  [320,400]
  - Tablet is   >=  [728, 400]
  - Desktop is  >=  [1024, 400]

## AdBlock detector

The function `detectAdBlocker()` needs a script named "ads.js" included in your <i>index.html</i>
ads.js should look like this:

```js
var isAdBlockEnabled = false;
```

And then:

```html
<head>
  <script src="assets/script/ads.js"></script>
</head>
```

You also need to put true to the <b>"adBlockDetector"</b> value in settings.json

It will then detect when an AdBlocker is used and execute what is in the `showDetectedAdBlocker()` function
You probably want to display a message asking the user to put your web app in his whitelist.

You can define the `showDetectedAdBlocker()` function by adding this to your ads.js:

```js
var adsFunction = function() {
  /* do whatever you want */
}

```

## Display ad in a web app with a single line of code

```ts
<ad-dfp [type]="'banner'"></ad-dfp>
```

OR

```ts
<ad-dfp [type]="'inter'"></ad-dfp>
```

That's it ! You're displaying DFP ads !

## License

This component is under MIT License
