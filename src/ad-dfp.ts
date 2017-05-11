import { Input, Component, OnInit, ElementRef } from '@angular/core';
import { BaseRequestOptions, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

declare var googletag: any;
declare var isAdBlockEnabled: string;
declare var adsFunction: any;

@Component({
    selector: 'ad-dfp',
    template: `
        <div class="adContainer" style="text-align: center;">
            <div class={{type}}>

            </div>
        </div>
    `
})
export class AdDFPComponent implements OnInit {

    @Input() type: string;

    public settings: any;

    constructor(
        private _elementRef: ElementRef,
        private _http: Http) { }
    /**
     * Called when the component is loading
     */
    ngOnInit() {
        this.getSettings().subscribe(data => {
            this.settings = data;
            this.defineAds(this.settings, googletag);
            let tag: number = this.getTag(this.type, this.settings);
            if (this.settings.adBlockDetector) {
                this.detectAdBlocker();
            }
            if (this.type === "hidden_inter") {

            } else {
                this.displayAd(tag);
            }
        });
    }
    /**
     * Detects if an ad blocker is used
     * @see http://stackoverflow.com/questions/4869154/how-to-detect-adblock-on-my-website
     * 
     */
    detectAdBlocker(): void {
        if (typeof isAdBlockEnabled === 'undefined') {
            this.showDetectedAdBlocker();
        }
    }
    /**
     * Show a ionic button asking the user to whitelist this siteweb.
     * 
     * If user clicks on "Do not remind me !" this button won't show up again on this device.
     */
    showDetectedAdBlocker(): void {
        if (typeof adsFunction !== 'undefined') {
            adsFunction();
        }
    }
    /**
     * This function returns the google tag needed corresponding to the type of the ad
     * @param type The type of ad wanted to be displayed 
     * 
     * @return tag The tag corresponding to the type of ad
     * 
     */
    getTag(type: string, settings: any): number {
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
        document.getElementsByClassName(this.type)[0].setAttribute("id", "div-gpt-ad-" + tag + "-0");
        if (googletag && googletag.apiReady) {
            googletag.cmd.push(function (result: any) {
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
        googletag.cmd.push(function () {
            var mappingBanner = googletag.sizeMapping().
                addSize([320, 400], [settings.mapping.mobile.width, settings.mapping.mobile.height]).
                addSize([728, 400], [settings.mapping.tablet.width, settings.mapping.tablet.height]).
                addSize([1024, 400], [settings.mapping.desktop.width, settings.mapping.desktop.height]).
                build();
            if (settings.ID.banner !== 0) {
                gptAdSlots[0] = googletag.defineSlot(`/${settings.network}/${settings.ID.banner}`, [[settings.mapping.mobile.width, settings.mapping.mobile.height], [settings.mapping.tablet.width, settings.mapping.tablet.height], [settings.mapping.desktop.width, settings.mapping.desktop.height]], `div-gpt-ad-${settings.tags.banner}-0`).
                    defineSizeMapping(mappingBanner).
                    addService(googletag.pubads());
            }
            if (settings.ID.inter !== 0) {
                gptAdSlots[1] = googletag.defineOutOfPageSlot(`/${settings.network}/${settings.ID.inter}`, `div-gpt-ad-${settings.tags.inter}-0`)
                    .addService(googletag.pubads());
                googletag.pubads().enableSingleRequest();
                googletag.pubads().collapseEmptyDivs();
                googletag.enableServices();
            }
        });
    }
    /**
     * Returns an observable by Get HTTP protocol on a json file
     * The returned observable can get data from a json file
     * 
     * @return Observable to get data from settings.json
     */
    getSettings(): Observable<any> {
        return this._http.get('/assets/settings/settings.json')
            .map(response => response.json());
    }
}