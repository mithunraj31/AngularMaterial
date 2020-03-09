import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
let NavbarComponent = class NavbarComponent {
    constructor(authService, router) {
        this.authService = authService;
        this.router = router;
    }
    ngOnInit() {
        this.isLoggedIn$ = this.authService.isLoggedIn();
    }
    logout() {
        this.authService.logout();
        this.router.navigate(["/login"]);
    }
};
NavbarComponent = tslib_1.__decorate([
    Component({
        selector: 'app-navbar',
        templateUrl: './navbar.component.html',
        styleUrls: ['./navbar.component.scss']
    })
], NavbarComponent);
export { NavbarComponent };
//# sourceMappingURL=navbar.component.js.map