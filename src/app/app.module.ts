import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReportsPageComponent } from './Pages/reports-page/reports-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MetricService } from './Services/metric-service';
import { ChartComponent } from './Components/chart/chart.component';
import { ReportsPageViewModel } from './Pages/reports-page/reports-page.viewmodel';

@NgModule({
  declarations: [
    AppComponent,
    ReportsPageComponent,
    MetricService,
    ChartComponent,
    ReportsPageViewModel
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
