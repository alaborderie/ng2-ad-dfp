import { OnInit, ElementRef } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
export declare class AdDFPComponent implements OnInit {
    private _elementRef;
    private _http;
    type: string;
    settings: any;
    constructor(_elementRef: ElementRef, _http: Http);
    ngOnInit(): void;
    detectAdBlocker(): void;
    showDetectedAdBlocker(): void;
    getTag(type: string, settings: any): number;
    displayAd(tag: number): void;
    defineAds(settings: any, googletag: any): void;
    getSettings(): Observable<any>;
}
