import { it, describe, expect, beforeEach, inject } from 'angular2/testing';
import {
    TestBed
} from '@angular/core/testing';
// import 'reflect-metadata';
import {
    FormGroup,
    ReactiveFormsModule
} from '@angular/forms';

import { AdDFPComponent } from "../src/ad-dfp";

describe('AdDFP Tests', () => {
    let component: AdDFPComponent;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AdDFPComponent],
            imports: [ReactiveFormsModule]
        });

        const fixture = TestBed.createComponent(AdDFPComponent);
        component = fixture.componentInstance;
    });

    describe('component should be instance of AdDFPComponent', () => {

        it('Should find instance of Component', () => {
            expect(component).toBeAnInstanceOf(AdDFPComponent);
        });
    });
});
