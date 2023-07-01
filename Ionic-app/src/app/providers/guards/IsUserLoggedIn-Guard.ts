import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AccountService } from "../services/account-service";
import { Observable } from "rxjs";
import { AppPagePath } from "src/app/models/enums/app-constant";

@Injectable({
    providedIn: 'root'
})
export class IsUserLoggedInForChildRoute implements CanActivateChild {
    constructor(private userService: AccountService, private router: Router) { }

    canActivateChild(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        return this.userService.isLoggedIn().then(result => {
            if (!result) {
                this.router.navigateByUrl(AppPagePath.Login);
            }
            return result;
        });
    }
}