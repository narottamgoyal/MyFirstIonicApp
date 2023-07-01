import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { SplashScreen } from '@capacitor/splash-screen';
import { StatusBar } from '@capacitor/status-bar';
import { MenuController, Platform, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { AppEvent, AppStorageKey } from './models/enums/app-constant';
import { IUserDetails } from './models/user/user-details';
import { AccountService } from './providers/services/account-service';
import { FcmService } from './providers/services/fcm-service';
import { LocalStorageService } from './providers/services/local-storage-service';
import { LoginService } from './providers/services/login-service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user: IUserDetails | undefined;
  loggedIn = false;
  dark = false;

  constructor(
    private menu: MenuController,
    private platform: Platform,
    private loginService: LoginService,
    private router: Router,
    private storage: Storage,
    private userService: AccountService,
    private swUpdate: SwUpdate,
    private fcmService: FcmService,
    private localStorageService: LocalStorageService,
    private toastCtrl: ToastController) {
    this.initializeApp();
  }

  async ngOnInit() {
    await this.storage.create();
    this.checkLoginStatus();
    this.listenForLoginEvents();

    this.dark = await this.localStorageService.get(AppStorageKey.IsDarkModeEnabled);

    this.swUpdate.versionUpdates.subscribe(async () => {
      const toast = await this.toastCtrl.create({
        message: 'Update available!',
        position: 'bottom',
        buttons: [
          {
            role: 'cancel',
            text: 'Reload'
          }
        ]
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
  }

  initializeApp() {
    this.platform.ready().then((res) => {
      this.loginService.refreshToken();
      if (this.platform.is('hybrid')) {
        StatusBar.hide();
        SplashScreen.hide();
        // Trigger the push setup
        this.fcmService.initPush();
      }
    });
  }

  async checkLoginStatus() {
    const loggedIn = await this.userService.isLoggedIn();
    let user = await this.userService.getUser();
    return await this.updateLoggedInStatus(loggedIn, user);
  }

  updateLoggedInStatus(loggedIn: boolean, user: IUserDetails | undefined) {
    setTimeout(() => {
      this.user = user;
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    window.addEventListener(AppEvent.Login, (event: any) => {
      this.updateLoggedInStatus(true, event.detail);
    });

    window.addEventListener(AppEvent.Logout, () => {
      this.updateLoggedInStatus(false, undefined);
    });
  }

  async logout() {
    await this.loginService.logout();
  }

  themeModeChanged() {
    this.localStorageService.set(AppStorageKey.IsDarkModeEnabled, this.dark);
  }
}
