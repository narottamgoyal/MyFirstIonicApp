import { Injectable } from "@angular/core";
import { v1 as uuidv1 } from 'uuid';

@Injectable({
    providedIn: 'root'
})
export class UtilService {

    getUniqueId() {
        return uuidv1();
    }

    getUniqueIdNumber() {
        const currentTime = new Date();
        return currentTime.getTime();
    }
}