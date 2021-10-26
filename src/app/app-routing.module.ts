import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteGuard } from './shared/guard/route.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./resume/resume.module')
      .then(module => module.ResumeModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/pages.module')
      .then(m => m.PagesModule)
  },
  {
    path: 'demo',
    canActivate: [RouteGuard],
    loadChildren: () => import('./demo/demo.module').then(m => m.DemoModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
