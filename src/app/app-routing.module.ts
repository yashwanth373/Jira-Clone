import { NgModule } from '@angular/core';
import { RouterModule, Routes,ExtraOptions } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { ProjectsDashboardComponent } from './projects-dashboard/projects-dashboard.component';
import { RedirectGuard } from './redirect.guard';
import { RegisterComponent } from './register/register.component';
import { LoggedinGuard } from './loggedin.guard';
import { ProjectslistComponent } from './projectslist/projectslist.component';
import { YourworkComponent } from './yourwork/yourwork.component';
import { PeoplelistComponent } from './peoplelist/peoplelist.component';
import { ProjectboardComponent } from './projectboard/projectboard.component';
import { ProjectdashboardComponent } from './projectdashboard/projectdashboard.component';
import { RoadmapComponent } from './roadmap/roadmap.component';
import { BacklogComponent } from './backlog/backlog.component';
import { CodeComponent } from './code/code.component';
import { MembersComponent } from './members/members.component';
import { SettingsComponent } from './settings/settings.component';

export const routingConfiguration: ExtraOptions = {
  paramsInheritanceStrategy: 'always'
};

const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: [RedirectGuard, ], pathMatch: 'full'},
  { path: 'Projects', 
    component: ProjectsDashboardComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'your-work', pathMatch: 'full' },
      {path: 'your-work', component: YourworkComponent, canActivate: [AuthGuard]},
      {path: 'Projectslist', component: ProjectslistComponent, canActivate: [AuthGuard]},
      {path: 'people',component: PeoplelistComponent, canActivate: [AuthGuard]},
      {path: ':projectId', component: ProjectdashboardComponent, canActivate: [AuthGuard] ,
        children:[
          { path: '', redirectTo: 'board', pathMatch: 'full' },
          {path: 'board', component: ProjectboardComponent, canActivate: [AuthGuard]},
          {path: 'roadmap', component: RoadmapComponent, canActivate: [AuthGuard]},
          {path: 'backlog', component: BacklogComponent, canActivate: [AuthGuard]},
          {path: 'code', component: CodeComponent, canActivate: [AuthGuard]},
          {path: 'members', component: MembersComponent, canActivate: [AuthGuard]},
          {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
        ]
      },
      // {path: '', redirectTo: 'your-work'}
    ]
  },
  {path: '**', redirectTo: ''}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
                                 // { enableTracing: true }
                                routingConfiguration
                                )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
