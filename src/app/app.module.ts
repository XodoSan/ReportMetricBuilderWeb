import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ReportsPageComponent } from './MetricChartComponent/Pages/reports-page/reports-page.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ViewModelComponent } from './MetricChartComponent/Pages/view-model/view-model.component';
import { MetricService } from './Services/metric-service';
import { ReportsPageViewModel } from './MetricChartComponent/reports-page-view-model';

@NgModule({
  declarations: [
    AppComponent,
    ReportsPageComponent,
    MetricService,
    ViewModelComponent,
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
