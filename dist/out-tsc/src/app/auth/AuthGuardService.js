import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
let AuthGuardService = class AuthGuardService {
    constructor(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    canActivate() {
        if (!this.auth.isAuthenticated()) {
            this.router.navigate(['login']);
            return false;
        }
        return true;
    }
};
AuthGuardService = tslib_1.__decorate([
    Injectable()
], AuthGuardService);
export { AuthGuardService };
//# sourceMappingURL=AuthGuardService.js.map