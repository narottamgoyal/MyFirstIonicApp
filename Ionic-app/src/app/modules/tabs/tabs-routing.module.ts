import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppPagePath } from 'src/app/models/enums/app-constant';
import { TabsPage } from './tabs-page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
          }
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: '',
            loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: AppPagePath.Account,
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsRoutingModule { }
