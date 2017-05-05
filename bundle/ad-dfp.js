"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ionic_angular_1 = require("ionic-angular");
var AdDFPComponent = (function () {
    function AdDFPComponent(_alertCtrl, _elementRef) {
        this._alertCtrl = _alertCtrl;
        this._elementRef = _elementRef;
    }
    AdDFPComponent.prototype.ngOnInit = function () {
        this.defineAds(this.getTag(this.type), googletag);
    };
    AdDFPComponent.prototype.ngAfterViewInit = function () {
        console.log('AdDFPComponent > ngAfterViewInit');
        var tag = this.getTag(this.type);
        console.log('tag = ' + tag);
        if (this.type === "hidden_inter") {
        }
        else {
            this.displayAd(tag);
        }
    };
    AdDFPComponent.prototype.ngOnDestroy = function () {
        console.log('AdDFPComponent > ngOnDestroy');
    };
    AdDFPComponent.prototype.detectAdBlocker = function () {
        console.log('AdDFPComponent > detectAdBlocker');
        if (typeof isAdBlockEnabled === 'undefined' && localStorage.getItem('AdBlockUser') !== 'true') {
            this.showDetectedAdBlocker();
        }
    };
    AdDFPComponent.prototype.showDetectedAdBlocker = function () {
        console.log('AdDFPComponent > showDetectedAdBlocker');
    };
    AdDFPComponent.prototype.getTag = function (type) {
        console.log('AdDFPComponent > getTag');
        var tag;
        if (type == "banner") {
            tag = 1235759124;
        }
        else if (type == "inter" || type == "hidden_inter") {
            tag = 1239757343;
        }
        else {
            tag = 0;
        }
        return tag;
    };
    AdDFPComponent.prototype.displayAd = function (tag) {
        console.log('AdDFPComponent > displayAd');
        console.log(this.type);
        document.getElementsByClassName(this.type)[0].setAttribute("id", "div-gpt-ad-" + tag + "-0");
        if (googletag && googletag.apiReady) {
            googletag.cmd.push(function (result) {
                console.log('AdDFPComponent > displayAd > push');
                googletag.display('div-gpt-ad-' + tag + '-0');
            });
        }
    };
    AdDFPComponent.prototype.defineAds = function (tag, googletag) {
        var googletag = googletag || {};
        googletag.cmd = googletag.cmd || [];
        var gptAdSlots = [];
        console.log('AdDFPComponent > ngOnInit > defineAds');
        googletag.cmd.push(function () {
            console.log('AdDFPComponent > ngOnInit > push');
            var mappingBanner = googletag.sizeMapping().
                addSize([320, 400], [320, 50]).
                build();
            gptAdSlots[0] = googletag.defineSlot("/208086926/1", [[320, 50], [728, 90], [1024, 120]], "div-gpt-ad-" + tag + "-0").
                defineSizeMapping(mappingBanner).
                addService(googletag.pubads());
            gptAdSlots[1] = googletag.defineOutOfPageSlot("/208086926/2", "div-gpt-ad-" + tag + "-0")
                .addService(googletag.pubads());
            googletag.pubads().enableSingleRequest();
            googletag.pubads().collapseEmptyDivs();
            googletag.enableServices();
        });
    };
    return AdDFPComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], AdDFPComponent.prototype, "type", void 0);
AdDFPComponent = __decorate([
    core_1.Component({
        selector: 'ad-dfp',
        template: "\n        <div text-center>\n            <div class={{type}}>\n\n            </div>\n        </div>\n    "
    }),
    __metadata("design:paramtypes", [ionic_angular_1.AlertController,
        core_1.ElementRef])
], AdDFPComponent);
exports.AdDFPComponent = AdDFPComponent;
//# sourceMappingURL=ad-dfp.js.map