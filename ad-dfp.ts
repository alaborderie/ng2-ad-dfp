import { Input, Component, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import { AlertController } from 'ionic-angular';

declare var googletag: any;
declare var isAdBlockEnabled: string;

@Component({
    selector: 'ad-dfp',
    template: `
        <div text-center>
            <div class={{type}}>

            </div>
        </div>
    `
})
export class AdDFPComponent implements AfterViewInit, OnInit {

    @Input() type: string;


    constructor(
        public _alertCtrl: AlertController,
        private _elementRef: ElementRef) { }
    /**
     * Called when the component is loading
     */
    ngOnInit() {
        this.defineAds(this.getTag(this.type), googletag);
    }
    /**
     * Called after the component has been loaded
     */
    ngAfterViewInit() {
        console.log('AdDFPComponent > ngAfterViewInit');
        let tag: number = this.getTag(this.type);
        console.log('tag = ' + tag);
        /* Uncomment to add AdBlockDetector feature */
        // this.detectAdBlocker();
        // console.log('AdDFPComponent > ngAfterViewInit > detectAdBlocker finished');
        if (this.type === "hidden_inter") {

        } else {
            this.displayAd(tag);
        }
    }
    /**
     * Removes component on page exit
     */
    ngOnDestroy() {
        console.log('AdDFPComponent > ngOnDestroy');
        /* Uncomment if you have jquery */
        /* Removes interstitial */
        // $("#mobile_inters").remove();
        // $("#mobile_inters_holder").remove();

        /* Removes banner */
        // $("#google_image_div").remove();

    }
    /**
     * Detects if an ad blocker is used
     * @see http://stackoverflow.com/questions/4869154/how-to-detect-adblock-on-my-website
     * 
     */
    detectAdBlocker(): void {
        console.log('AdDFPComponent > detectAdBlocker');
        if (typeof isAdBlockEnabled === 'undefined' && localStorage.getItem('AdBlockUser') !== 'true') {
            this.showDetectedAdBlocker();
        }
    }
    /**
     * Show a ionic button asking the user to whitelist this siteweb.
     * 
     * If user clicks on "Do not remind me !" this button won't show up again on this device.
     */
    showDetectedAdBlocker(): void {
        console.log('AdDFPComponent > showDetectedAdBlocker');
        /* Do whatever you want */
    }
    /**
     * This function returns the google tag needed corresponding to the type of the ad
     * @param type The type of ad wanted to be displayed 
     * 
     * @return tag The tag corresponding to the type of ad
     * 
     */
    getTag(type: string): number {
        console.log('AdDFPComponent > getTag');
        let tag: number;
        if (type == "banner") {
            // tag = XXXXXX;
        } else if (type == "inter" || type == "hidden_inter") {
            // tag = XXXXXX;
        } else {
            // tag = XXXXXX
        }
        return tag;
    }

    /**
     * Displays an ad
     * @param tag The tag of the ad wanted to be displayed
     */
    displayAd(tag: number): void {
        console.log('AdDFPComponent > displayAd');
        console.log(this.type);
        document.getElementsByClassName(this.type)[0].setAttribute("id", "div-gpt-ad-" + tag + "-0");
        if (googletag && googletag.apiReady) {
            googletag.cmd.push(function (result: any) {
                console.log('AdDFPComponent > displayAd > push');
                googletag.display('div-gpt-ad-' + tag + '-0');
            });
        }
    }

    /**
     * Define Slots used for the ads to display
     * @param googletagSettings User's settings concerning ads (tag is different for each school)
     * @param googletag The googletag declared by google's script included in index.html
     */
    defineAds(tag: number, googletag: any): void {
        var googletag = googletag || {};
        googletag.cmd = googletag.cmd || [];
        var gptAdSlots = [];
        console.log('AdDFPComponent > ngOnInit > defineAds');
        googletag.cmd.push(function () {
            console.log('AdDFPComponent > ngOnInit > push');
            var mappingBanner = googletag.sizeMapping().
                addSize([320, 400], [320, 50]).
                build();
            /* Replace XXXXXX With you informations */
            gptAdSlots[0] = googletag.defineSlot(`/XXXXXX/1`, [[320, 50], [728, 90], [1024, 120]], `div-gpt-ad-${tag}-0`).
                defineSizeMapping(mappingBanner).
                addService(googletag.pubads());
            gptAdSlots[1] = googletag.defineOutOfPageSlot(`/XXXXXX/2`, `div-gpt-ad-${tag}-0`)
                .addService(googletag.pubads());
            googletag.pubads().enableSingleRequest();
            googletag.pubads().collapseEmptyDivs();
            googletag.enableServices();
        });
    }
}