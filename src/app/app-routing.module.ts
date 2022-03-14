import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { ProjectsDashboardComponent } from './projects-dashboard/projects-dashboard.component';
import { RedirectGuard } from './redirect.guard';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: [RedirectGuard]},
  {path: 'login',component: LoginComponent},
  {path: 'ProjectsDashboard', component: ProjectsDashboardComponent, canActivate: [AuthGuard]},
  {path: 'register',component: RegisterComponent, canActivate: [AuthGuard]},
  {path: '**', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
