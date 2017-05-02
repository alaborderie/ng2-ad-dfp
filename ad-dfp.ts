/**
 * @author Antoine Laborderie
 */
import { Input, Component, AfterViewInit, ElementRef } from '@angular/core';
import { Events } from 'ionic-angular';

declare var googletag: any;
declare var isAdBlockEnabled: string;

@Component({
    selector: 'ad-dfp',
    template: `
        <div class={{type}}>

        </div>
    `
})
export class AdDFPComponent implements AfterViewInit {

    @Input() type: string;

    constructor(
        public _events: Events,
        private _elementRef: ElementRef) { }
    /**
     * Called after the component has been loaded
     */
    ngAfterViewInit() {
        console.log('AdDFPComponent > ngAfterViewInit');
        let type: string = this.type;
        let tag: string = this.getTag(type);
        console.log('tag = ' + tag);
        /* Uncomment for AdBlockerDetector feature */
        //this.detectAdBlocker();
        if (this.type === "hidden_inter") {
            this._events.ad.display().subscribe(() => {
                console.log('AdDFPComponent > _events.ad.display().subscribe');
                this.displayAd(tag);
            })
        } else {
            this.displayAd(tag);
        }

        if (this.type === "banner") {
            this.centerBanner(tag);
        }
    }
    /**
     * Removes component on page exit
     */
    ngOnDestroy() {
        console.log('AdDFPComponent > ngOnDestroy');
        /* Uncomment if using jQuery */
        /* Removes interstitial */
        //$("#mobile_inters").remove();
        //$("#mobile_inters_holder").remove();

        /* Removes banner */
        //$("#google_image_div").remove();
    }
    /**
     * Detects if an ad blocker is used
     * @see http://stackoverflow.com/questions/4869154/how-to-detect-adblock-on-my-website
     * 
     */
    detectAdBlocker() {
        console.log('AdDFPComponent > detectAdBlocker');
        if (typeof isAdBlockEnabled === 'undefined' && localStorage.getItem('AdBlockUser') !== 'true') {
            this.showDetectedAdBlocker();
        }
    }
    /**
     * Called when an AdBlocker is detected.
     */
    showDetectedAdBlocker() {
        console.log('AdDFPComponent > showDetectedAdBlocker');
        /* Do whatever you want when user has AdBlock enabled */
    }
    /**
     * This function returns the google tag needed corresponding to the type of the ad
     * @param type The type of ad wanted to be displayed 
     * 
     * @return tag The tag corresponding to the type of ad
     * 
     */
    getTag(type: string) {
        console.log('AdDFPComponent > getTag');
        let tag: string;
        /* replace values of tag with your own */
        if (this.type == "banner") {
            tag = "1234567891011";
        } else if (this.type == "inter" || this.type == "hidden_inter") {
            tag = "1234567891011";
        } else {
            tag = "0";
        }
        return tag;
    }

    /**
     * Displays an ad
     * @param tag The tag of the ad wanted to be displayed
     */
    displayAd(tag: string) {
        console.log('AdDFPComponent > displayAd');
        document.getElementsByClassName(this.type)[0].setAttribute("id", "div-gpt-ad-" + tag + "-0");
        if (googletag && googletag.apiReady) {
            googletag.cmd.push(function (result: any) {
                console.log('AdDFPComponent > displayAd > push');
                googletag.display('div-gpt-ad-' + tag + '-0');
            });
        }
    }
    /**
     * Centers a banner in case the device's screen is larger than the banner's one.
     * @param tag The tag of the ad wanted to be centered
     */
    centerBanner(tag: string) {
        console.log('AdDFPComponent > centerBanner');
        document.getElementById('div-gpt-ad-' + tag + '-0').setAttribute("style",
            "display: inline-block; margin: 0 auto; text-align: center;");
    }
    /**
     * Define Slots used for the ads to display
     * 
     * This function is not working as expected,
     * We have to define ads before the call to the component constructor
     * 
     * To make it work properly, call a script in your index.html body with the content of this function
     */
    defineAds() {
        console.log('AdDFPComponent > defineAds');
        var googletag = googletag || {};
        googletag.cmd = googletag.cmd || [];
        var gptAdSlots = [];
        googletag.cmd.push(function () {
            console.log('AdDFPComponent > defineAds > push');

            /* Example of mapping for a banner */
            var mappingBanner = googletag.sizeMapping().
                addSize([320, 400], [320, 50]).
                addSize([750, 200], [728, 90]).
                addSize([1050, 200], [1024, 120]).
                build();

            /* Replace tag values by your own tags */
            gptAdSlots[0] = googletag.defineSlot('/123456789/1', [[320, 50], [728, 90], [1024, 120]], 'div-gpt-ad-1234567891011-0').
                defineSizeMapping(mappingBanner).
                addService(googletag.pubads());
            gptAdSlots[1] = googletag.defineOutOfPageSlot('/123456789/2', 'div-gpt-ad-1234567891011-0')
                .addService(googletag.pubads());

            googletag.pubads().enableSingleRequest();
            googletag.pubads().collapseEmptyDivs();
            googletag.enableServices();
        });
        console.log('Finished setting up googleads');
    }
}
