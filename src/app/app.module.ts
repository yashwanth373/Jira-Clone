import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProjectsDashboardComponent } from './projects-dashboard/projects-dashboard.component';
import { RegisterComponent } from './register/register.component';
import { YourworkComponent } from './yourwork/yourwork.component';
import { ProjectslistComponent } from './projectslist/projectslist.component';
import { PeoplelistComponent } from './peoplelist/peoplelist.component';
import { ProjectboardComponent } from './projectboard/projectboard.component';
import { ProjectdashboardComponent } from './projectdashboard/projectdashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProjectsDashboardComponent,
    RegisterComponent,
    YourworkComponent,
    ProjectslistComponent,
    PeoplelistComponent,
    ProjectboardComponent,
    ProjectdashboardComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
