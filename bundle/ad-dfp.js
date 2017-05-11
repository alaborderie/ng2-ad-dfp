"use strict";
const core_1 = require('@angular/core');
const http_1 = require('@angular/http');
require('rxjs/add/operator/map');
class AdDFPComponent {
    constructor(_elementRef, _http) {
        this._elementRef = _elementRef;
        this._http = _http;
    }
    ngOnInit() {
        this.getSettings().subscribe(data => {
            this.settings = data;
            this.defineAds(this.settings, googletag);
            let tag = this.getTag(this.type, this.settings);
            if (this.settings.adBlockDetector) {
                this.detectAdBlocker();
            }
            if (this.type === "hidden_inter") {
            }
            else {
                this.displayAd(tag);
            }
        });
    }
    detectAdBlocker() {
        if (typeof isAdBlockEnabled === 'undefined') {
            this.showDetectedAdBlocker();
        }
    }
    showDetectedAdBlocker() {
        if (typeof adsFunction !== 'undefined') {
            adsFunction();
        }
    }
    getTag(type, settings) {
        let tag;
        if (type == "banner") {
            tag = settings.tags.banner;
        }
        else if (type == "inter" || type == "hidden_inter") {
            tag = settings.tags.inter;
        }
        else {
            tag = 0;
        }
        return tag;
    }
    displayAd(tag) {
        document.getElementsByClassName(this.type)[0].setAttribute("id", "div-gpt-ad-" + tag + "-0");
        if (googletag && googletag.apiReady) {
            googletag.cmd.push(function (result) {
                googletag.display('div-gpt-ad-' + tag + '-0');
            });
        }
    }
    defineAds(settings, googletag) {
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
    getSettings() {
        return this._http.get('/assets/settings/settings.json')
            .map(response => response.json());
    }
}
AdDFPComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'ad-dfp',
                template: `
        <div class="adContainer" style="text-align: center;">
            <div class={{type}}>

            </div>
        </div>
    `
            },] },
];
AdDFPComponent.ctorParameters = () => [
    { type: core_1.ElementRef, },
    { type: http_1.Http, },
];
AdDFPComponent.propDecorators = {
    'type': [{ type: core_1.Input },],
};
exports.AdDFPComponent = AdDFPComponent;
//# sourceMappingURL=ad-dfp.js.map