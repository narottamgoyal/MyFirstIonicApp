import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPagePath } from './models/enums/app-constant';
import { IsUserLoggedInForChildRoute } from './providers/guards/IsUserLoggedIn-Guard';
import { CanLoadGuard } from './providers/guards/CanLoadGuard';

const routes: Routes = [
  {
    path: 'app',
    canActivateChild: [IsUserLoggedInForChildRoute],
    loadChildren: () => import('./modules/tabs/tabs.module').then(m => m.TabsModule)
  },
  {
    path: 'login', canMatch: [CanLoadGuard],
    loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: '',
    redirectTo: AppPagePath.Home,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/login'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes /*, { preloadingStrategy: PreloadAllModules }*/)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
