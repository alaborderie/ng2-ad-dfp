import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdDFPComponent } from './ad-dfp';
import 'reflect-metadata';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AdDFPComponent
  ],
  exports: []
})

export class AppModule { }