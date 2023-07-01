import { Injectable } from "@angular/core";
import { LocalNotifications } from "@capacitor/local-notifications";
import { AppChannel } from "src/app/models/enums/app-constant";
import { UtilService } from "./util-service";
import { Platform } from "@ionic/angular";

@Injectable({
    providedIn: 'root'
})
export class LocalNotificationService {
    private isWeb = false;
    constructor(private utilService: UtilService, private platform: Platform) {
        this.isWeb = !(this.platform.is('android') || this.platform.is('ios'));
        this.createChannel();
    }

    async send(title: string, message: string, appChannel: AppChannel = AppChannel.Info) {
        if (this.isWeb) { return; }
        try {
            LocalNotifications.schedule({
                notifications: [{
                    body: message,
                    title: title,
                    channelId: appChannel,
                    id: this.utilService.getUniqueIdNumber()
                }]
            });
        }
        catch (error: any) {
            console.debug(error)
        }
    }

    private async createChannel() {
        if (this.isWeb) { return; }
        try {
            LocalNotifications.createChannel({
                id: AppChannel.Info,
                description: "App Info",
                name: 'Info'
            });
        }
        catch (error: any) {
            console.debug(error)
        }
    }
}