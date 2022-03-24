import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
import { ProjectSearchPipe } from './project-search.pipe';
import { PeopleSearchPipe } from './people-search.pipe';

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
    ProjectdashboardComponent,
    ProjectSearchPipe,
    PeopleSearchPipe,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
