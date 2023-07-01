import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HomeRoutingModule } from './homerouting.module';
import { HomePage } from './home-page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomeRoutingModule
    ],
    declarations: [HomePage]
})
export class HomeModule { }
