import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service';
import { LoginComponent } from './login/login.component';
import { ProjectsDashboardComponent } from './projects-dashboard/projects-dashboard.component';

const routes: Routes = [
  {path: '', component: LoginComponent, canActivate: [AuthGuardService]},
  {path: 'login',component: LoginComponent},
  {path: 'home', component: ProjectsDashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
