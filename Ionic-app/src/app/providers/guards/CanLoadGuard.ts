import { Injectable } from "@angular/core";
import { CanMatch, Route, Router, UrlSegment } from "@angular/router";
import { Observable } from "rxjs";
import { AccountService } from "../services/account-service";
import { AppPagePath } from "src/app/models/enums/app-constant";

@Injectable({
    providedIn: 'root'
})
export class CanLoadGuard implements CanMatch {
    constructor(private userService: AccountService, private router: Router) { }

    canMatch(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        return this.userService.isLoggedIn().then(result => {
            if (result) {
                this.router.navigateByUrl(AppPagePath.Home);
            }
            return true;
        });
    }
}
