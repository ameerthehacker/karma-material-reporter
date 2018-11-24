import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { 
  MatTabsModule, 
  MatExpansionModule, 
  MatListModule, 
  MatIconModule, 
  MatProgressSpinnerModule, 
  MatToolbarModule, 
  MatCardModule 
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { SuiteInfoComponent } from './components/suite-info/suite-info.component';

@NgModule({
  declarations: [
    AppComponent,
    SuiteInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTabsModule,
    FlexLayoutModule,
    MatExpansionModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
