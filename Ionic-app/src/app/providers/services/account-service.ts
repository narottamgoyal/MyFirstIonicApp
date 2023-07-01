import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AppEvent, AppStorageKey } from 'src/app/models/enums/app-constant';
import { IUserDetails } from 'src/app/models/user/user-details';
import { LocalNotificationService } from './local-notification-service';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    favorites: string[] = [];

    constructor(public storage: Storage, private localNotificationService: LocalNotificationService) { }

    hasFavorite(sessionName: string): boolean {
        return (this.favorites.indexOf(sessionName) > -1);
    }

    addFavorite(sessionName: string): void {
        this.favorites.push(sessionName);
    }

    removeFavorite(sessionName: string): void {
        const index = this.favorites.indexOf(sessionName);
        if (index > -1) {
            this.favorites.splice(index, 1);
        }
    }

    async login(user: IUserDetails): Promise<any> {
        await this.storage.set(AppStorageKey.CurrentUser, user);
        return window.dispatchEvent(new CustomEvent(AppEvent.Login, { detail: user }));
    }

    async logout(): Promise<any> {
        await this.storage.remove(AppStorageKey.CurrentUser);
        await this.localNotificationService.send('😄', 'Thank you for using the APP!');
        window.dispatchEvent(new CustomEvent(AppEvent.Logout));
    }

    async getUser(): Promise<IUserDetails | undefined> {
        const user = await this.storage.get(AppStorageKey.CurrentUser);
        if (!user) { return undefined; }
        return { name: user.name, email: user.email, imageUrl: user.imageUrl };
    }

    async isLoggedIn(): Promise<boolean> {
        return await this.getUser() != undefined;
    }
}
