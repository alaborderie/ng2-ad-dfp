import 'core-js'; // ES6 + reflect-metadata
// zone.js
import 'zone.js/dist/zone';
import 'zone.js/dist/proxy';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/async-test';
import 'zone.js/dist/jasmine-patch';

import { TestBed, async } from '@angular/core/testing';
import { AdDFPComponent } from './ad-dfp';


describe('AdDFPComponent', () => {

    let comp: AdDFPComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AdDFPComponent], // declare the test component
        });

        const fixture = TestBed.createComponent(AdDFPComponent);
        comp = fixture.componentInstance; // AdDFPComponent test instance
    });

    it('should have a defined component', () => {
        expect(comp).toBeDefined();
    });
});