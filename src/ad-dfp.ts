import { Input, Component, AfterViewInit, OnInit, ElementRef } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { BaseRequestOptions, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import * as settings from '../settings/settings.json';

declare var googletag: any;
declare var isAdBlockEnabled: string;

@Component({
    selector: 'ad-dfp',
    template: `
        <div class="adContainer">
            <div class={{type}}>

            </div>
        </div>
    `
})
export class AdDFPComponent implements AfterViewInit, OnInit {

    @Input() type: string;

    public settings: any;

    constructor(
        public _alertCtrl: AlertController,
        private _elementRef: ElementRef,
        private _http: Http) { }
    /**
     * Called when the component is loading
     */
    ngOnInit() {
        console.log('AdDFPComponent > ngOnInit');
        this.settings = this.getSettings();
        console.log(JSON.stringify(this.settings));
        this.defineAds(this.settings, googletag);
    }
    /**
     * Called after the component has been loaded
     */
    ngAfterViewInit() {
        console.log('AdDFPComponent > ngAfterViewInit');
        let tag: number = this.getTag(this.type, this.settings);
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
    getTag(type: string, settings: any): number {
        console.log('AdDFPComponent > getTag');
        let tag: number;
        if (type == "banner") {
            tag = settings.tags.banner;
        } else if (type == "inter" || type == "hidden_inter") {
            tag = settings.tags.inter;
        } else {
            tag = 0
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
    defineAds(settings: any, googletag: any): void {
        var googletag = googletag || {};
        googletag.cmd = googletag.cmd || [];
        var gptAdSlots = [];
        console.log('AdDFPComponent > ngOnInit > defineAds');
        googletag.cmd.push(function () {
            console.log('AdDFPComponent > ngOnInit > push');
            var mappingBanner = googletag.sizeMapping().
                addSize([320, 400], [320, 50]).
                build();
            gptAdSlots[0] = googletag.defineSlot(`/${settings.network}/1`, [[320, 50], [728, 90], [1024, 120]], `div-gpt-ad-${settings.tags.banner}-0`).
                defineSizeMapping(mappingBanner).
                addService(googletag.pubads());
            gptAdSlots[1] = googletag.defineOutOfPageSlot(`/${settings.network}/2`, `div-gpt-ad-${settings.tags.inter}-0`)
                .addService(googletag.pubads());
            googletag.pubads().enableSingleRequest();
            googletag.pubads().collapseEmptyDivs();
            googletag.enableServices();
        });
    }

    getSettings(): Observable<any> {
        console.log('AdDFPComponent > getSettings');
        return this._http.get('ad-dfp/settings.json')
            .map(response => response.json());
    }
}