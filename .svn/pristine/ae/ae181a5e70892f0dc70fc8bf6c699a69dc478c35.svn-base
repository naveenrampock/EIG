import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../dataservice/auth.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class CanActivatedAuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    public router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let userType = Cookie.get('userType');
    userType = userType ? userType : '0';

    let isUserDeviceValid = Cookie.get('isUserDeviceValid');
    isUserDeviceValid = isUserDeviceValid ? isUserDeviceValid : 'false';
    if (isUserDeviceValid === 'false') {
      Cookie.delete('token');
      Cookie.delete('userType');
    }

    if (Cookie.get('token')) {
      if (route.data.role.some(r => userType == r)) {
        return true;
      } else if (userType == '1' || userType == '2' || userType == '3') {
        this.router.navigate(['/home']);
      } else if (userType == '0') {
        this.router.navigate(['/login']);
      }
      return false;
    } else if (route.data.role.some(r => userType == r)) {
      return true;
    } else {
      this.router.navigate(["login"]);
      return false;
    }
  }
}

// @Injectable()
// export class InvertAuthGuard extends CanActivatedAuthGuard {
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

//     if (localStorage.getItem("token_ls")) {
//          this.router.navigate(["/admin"]);
//       return false;
//     }

// }
// }