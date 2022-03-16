import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: [RedirectGuard]},
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
          {path: 'board', component: ProjectboardComponent, canActivate: [AuthGuard]}
        ]
      },
      // {path: '', redirectTo: 'your-work'}
    ]
  },
  {path: '**', redirectTo: ''}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
