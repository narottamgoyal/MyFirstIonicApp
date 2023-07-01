export enum AppEvent {
    Login = 'user:login',
    Logout = 'user:logout'
}

export enum AppChannel {
    Info = 'Info'
}

export enum AppStorageKey {
    AccessToken = 'access_token',
    IsDarkModeEnabled = 'IsDarkModeEnabled',
    CurrentUser = 'CurrentUser'
}

export enum AppPagePath {
    Login = '/login',
    Account = '/app/tabs/account',
    Home = '/app/tabs/home'
}
