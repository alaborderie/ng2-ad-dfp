<b>Angular 2 TypeScript Component</b>

This component was written by Antoine Laborderie working at Lekooa

It is under MIT License



Display ad in a web app with a single line of code:

`<ad-dfp [type]="'banner'"></ad-dfp>`

<b>Settings !</b>

To set-up your settings you need to:

  - Define your DFP slots
  - Modify tags

<b>Define your DFP Slots</b>

You need to copy paste the content of `defineAds()̀` into a file named "defineAds.js"

Now you have to fill the "tags" and the mapping as you want it (You can generate tags through Doubleclick's interface).

Then you should include it in your index.html.

<b>Modify tags</b>

In the component, a function `getTag()` exists to get the right tag depending of the type of ad picked.

You should fill the lines with your own tags, generated through DFP

<b>AdBlock detector</b>

The function `detectAdBlocker()` needs a script named "ads.js" included in your <i>index.html</i>
```
<head>
  <script src="assets/script/ads.js"></script>
</head>
```
It will then detect when an AdBlocker is used and execute what is in the `showDetectedAdBlocker()` function
You probably want to display a message asking the user to put your web app in his whitelist.
