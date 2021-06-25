import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ChartScrollableComponent } from './chart-scroll/chart-scrollable.component';

@NgModule({
  imports: [BrowserModule, FormsModule, ChartsModule],
  declarations: [AppComponent, ChartScrollableComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
