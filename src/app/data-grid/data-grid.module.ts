import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataGridComponent } from './data-grid.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  imports: [
    CommonModule,BrowserModule, AgGridModule.withComponents([])
  ],
  declarations: [DataGridComponent]
})
export class DataGridModule { }
