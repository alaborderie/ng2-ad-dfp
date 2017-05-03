"use strict";
exports.__esModule = true;
var testing_1 = require("angular2/testing");
var testing_2 = require("@angular/core/testing");
// import 'reflect-metadata';
var forms_1 = require("@angular/forms");
var ad_dfp_1 = require("../src/ad-dfp");
testing_1.describe('AdDFP Tests', function () {
    var component;
    testing_1.beforeEach(function () {
        testing_2.TestBed.configureTestingModule({
            declarations: [ad_dfp_1.AdDFPComponent],
            imports: [forms_1.ReactiveFormsModule]
        });
        var fixture = testing_2.TestBed.createComponent(ad_dfp_1.AdDFPComponent);
        component = fixture.componentInstance;
    });
    testing_1.describe('component should be instance of AdDFPComponent', function () {
        testing_1.it('Should find instance of Component', function () {
            testing_1.expect(component).toBeAnInstanceOf(ad_dfp_1.AdDFPComponent);
        });
    });
});
