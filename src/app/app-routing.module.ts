import { NgModule } from '@angular/core';
import { RouterModule, Routes,ExtraOptions } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { ProjectsDashboardComponent } from './projects-dashboard/projects-dashboard.component';
import { RedirectGuard } from './redirect.guard';
import { ProjectslistComponent } from './projectslist/projectslist.component';
import { YourworkComponent } from './yourwork/yourwork.component';
import { PeoplelistComponent } from './peoplelist/peoplelist.component';
import { ProjectboardComponent } from './projectboard/projectboard.component';
import { ProjectdashboardComponent } from './projectdashboard/projectdashboard.component';
import { CodeComponent } from './code/code.component';
import { MembersComponent } from './members/members.component';
import { SettingsComponent } from './settings/settings.component';
import { AccessGuard } from './access.guard';
import { BacklogComponent } from './backlog/backlog.component';
import { IssuesComponent } from './issues/issues.component';

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
          {path: 'board', component: ProjectboardComponent, canActivate: [AuthGuard,AccessGuard]},
          {path: 'backlog', component: BacklogComponent, canActivate: [AuthGuard,AccessGuard]},
          {path: 'issues', component: IssuesComponent, canActivate: [AuthGuard,AccessGuard]},
          {path: 'code', component: CodeComponent, canActivate: [AuthGuard,AccessGuard]},
          {path: 'members', component: MembersComponent, canActivate: [AuthGuard,AccessGuard]},
          {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard,AccessGuard]},
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
