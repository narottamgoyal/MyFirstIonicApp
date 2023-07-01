import { Component } from '@angular/core';
import { IUserDetails } from 'src/app/models/user/user-details';
import { LoginService } from 'src/app/providers/services/login-service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
})
export class LoginPage {
  login: IUserDetails = {};

  constructor(public loginService: LoginService) { }

  ionViewDidEnter() {
    this.loginService.initialize();
  }
}
