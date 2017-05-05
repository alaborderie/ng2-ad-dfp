import { AfterViewInit, OnInit, ElementRef } from '@angular/core';
import { AlertController } from 'ionic-angular';
export declare class AdDFPComponent implements AfterViewInit, OnInit {
    _alertCtrl: AlertController;
    private _elementRef;
    type: string;
    constructor(_alertCtrl: AlertController, _elementRef: ElementRef);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    detectAdBlocker(): void;
    showDetectedAdBlocker(): void;
    getTag(type: string): number;
    displayAd(tag: number): void;
    defineAds(tag: number, googletag: any): void;
}
