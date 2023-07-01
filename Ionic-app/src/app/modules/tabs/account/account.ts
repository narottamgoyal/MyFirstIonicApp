import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { AccountService } from 'src/app/providers/services/account-service';
import { GoogleMapModal } from '../google-map-page/google-map-page';
import { IGenericAddress } from 'src/app/models/user/generic-address';
import { IUserDetails } from 'src/app/models/user/user-details';


@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
  styleUrls: ['./account.scss'],
})
export class AccountPage {
  user: IUserDetails | undefined;
  mobileNumber: string | undefined;
  currentAddress: IGenericAddress | undefined;

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    public modalCtrl: ModalController,
    public routerOutlet: IonRouterOutlet,
    private userService: AccountService
  ) { }

  ionViewDidEnter() {
    this.getUserDetails();
  }

  getUserDetails() {
    this.getUsername();
  }

  async updateAddress() {
    const modal = await this.modalCtrl.create({
      component: GoogleMapModal,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: { address: this.currentAddress ? JSON.parse(JSON.stringify(this.currentAddress)) : undefined }
    });

    await modal.present();
    let data: any = await modal.onWillDismiss();
    if (data?.data) { this.currentAddress = data.data; }
  }

  async changeMobileNumber() {
    const alert = await this.alertCtrl.create({
      header: 'Update Mobile Number',
      buttons: [
        'Cancel',
        {
          text: 'Ok',
          handler: (data: any) => {
            // this.userService.setMobileNumber(data.mobileNumber);
            this.mobileNumber = data.mobileNumber;
            this.getUserDetails();
          }
        }
      ],
      inputs: [
        {
          type: 'text',
          name: 'mobileNumber',
          value: this.mobileNumber,
          placeholder: 'Mobile Number'
        }
      ]
    });
    await alert.present();
  }

  getUsername() {
    this.userService.getUser().then((user) => {
      this.user = user;
    });
  }
}