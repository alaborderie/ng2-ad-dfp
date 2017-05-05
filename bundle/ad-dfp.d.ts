import { AfterViewInit, OnInit, ElementRef } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
export declare class AdDFPComponent implements AfterViewInit, OnInit {
    _alertCtrl: AlertController;
    private _elementRef;
    private _http;
    type: string;
    settings: any;
    constructor(_alertCtrl: AlertController, _elementRef: ElementRef, _http: Http);
    ngOnInit(): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    detectAdBlocker(): void;
    showDetectedAdBlocker(): void;
    getTag(type: string, settings: any): number;
    displayAd(tag: number): void;
    defineAds(settings: any, googletag: any): void;
    getSettings(): Observable<any>;
}
