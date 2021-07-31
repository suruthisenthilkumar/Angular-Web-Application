import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainFrameComponent } from './modules/core-modules/main-frame/main-frame.component';
import { GetStartedComponent } from './modules/Get-Started/get-started/get-started.component';
import { NewRequestComponent } from './modules/new-request/new-request.component';
import { ReportsComponent } from './modules/reports/reports.component';


const routes: Routes = [
  
  {
    path:'register',
    loadChildren:'./modules/register-page/register-page.module#RegisterPageModule'
  },
  { 
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren:'./modules/core-modules/login/login.module#LoginModule'
  },
  {
    path: 'dashboard',
    loadChildren:'./modules/core-modules/dashboard/dashboard.module#DashboardModule'
  },
  
  { path: 'Portal',
  component: MainFrameComponent,
  runGuardsAndResolvers: 'always',
  children:[
    {
      path: '',
      pathMatch: 'full',
      redirectTo: '/404',
  },     
  {
    path: 'getstarted',
    loadChildren:'./modules/Get-Started/get-started/get-started.module#GetStartedModule'
  },
  {
    path:'reports',
    loadChildren:'./modules/reports/reports.module#ReportsModule'
  },
  {
    path: 'settings',
    loadChildren:'./modules/settings/settings.module#SettingsModule'
  },{
    path:'newrfirequest',
    component:NewRequestComponent
  }
]
  },
  { path: '**', redirectTo: '/404',pathMatch:'full'},
  {
    path:'404',
    loadChildren:'./modules/page404/page404.module#Page404Module'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
