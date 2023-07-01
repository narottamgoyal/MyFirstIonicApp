import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { GoogleAuth } from "@codetrix-studio/capacitor-google-auth";
import { Platform } from "@ionic/angular";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, User, getAuth, onAuthStateChanged, signInWithCredential } from "firebase/auth";
import { AppPagePath, AppStorageKey } from "src/app/models/enums/app-constant";
import { environment } from "./../../../environments/environment";
import { AccountService } from "./account-service";
import { LocalStorageService } from "./local-storage-service";

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    isWeb = false;
    firebase: any;
    constructor(
        private userService: AccountService,
        private localStorageService: LocalStorageService,
        private platform: Platform,
        private router: Router) {
        this.isWeb = !(this.platform.is('android') || this.platform.is('ios'));
        this.firebase = initializeApp(environment.firebase);
    }

    public async refreshToken() {
        const auth = getAuth(this.firebase);
        onAuthStateChanged(auth, async (currenUser: User | null) => {
            if (currenUser) {
                const idToken = await currenUser.getIdToken(true);
                console.log(idToken);
                await this.localStorageService.set(AppStorageKey.AccessToken, idToken);
            } else {
                await this.logout();
            }
        });
    }

    async logout() {
        await getAuth(this.firebase).signOut();
        await GoogleAuth.signOut().then(() => console.log('Signed Out')).catch((e) => { console.log('Signed Out') });
        this.userService.logout().then(async () => {
            this.router.navigateByUrl('/login');
        });
    }

    initialize() {
        if (this.isWeb) {
            GoogleAuth.initialize({ grantOfflineAccess: true });
        }
    }

    async loginViaGoogle() {
        try {
            const user = await GoogleAuth.signIn();
            if (user) {
                // Sign in with credential from the Google user.
                signInWithCredential(getAuth(this.firebase), GoogleAuthProvider.credential(user.authentication.idToken))
                    .then(async (s) => {
                        const access_token = await s.user.getIdToken();
                        await this.localStorageService.set(AppStorageKey.AccessToken, access_token);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
                this.userService.login({ name: user.givenName, email: user.email, imageUrl: user.imageUrl });
                this.router.navigateByUrl(AppPagePath.Home);
            }
        } catch (error) {
            console.log(error);
        }
    }
}