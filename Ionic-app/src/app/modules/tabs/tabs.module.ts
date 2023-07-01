import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AccountModule } from './account/account.module';
import { GoogleMapModal } from './google-map-page/google-map-page';
import { TabsPage } from './tabs-page';
import { TabsRoutingModule } from './tabs-routing.module';
import { HomeModule } from './home/home.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    AccountModule,
    FormsModule,
    HomeModule,
    TabsRoutingModule
  ],
  declarations: [
    TabsPage,
    GoogleMapModal
  ]
})
export class TabsModule { }
