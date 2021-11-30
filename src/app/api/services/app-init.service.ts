import {APP_INITIALIZER, Injectable} from '@angular/core';
import {GlobalService} from './global.service';
import {LoginService} from "./login.service";

@Injectable({
  providedIn: 'root'
})

export class AppInitService {

  constructor(private global: GlobalService,
              private loginService: LoginService) {
  }

  init(): Promise<any> {
    return new Promise<void>( async resolve => {
      const token = localStorage.getItem("token");
      if (token) {
        this.global.jwtToken = token;
        await this.loginService.getUserInfo()
          .then(response => {
            this.global.isLoggedInStatus = true;
            this.global.loggedInAccount = response;
            resolve();
          })
          .catch(() => {
            this.global.jwtToken = undefined;
            localStorage.removeItem("token");
            resolve();
          })
      }
      resolve();
    });
  }
}

export const appInitProviders = [
  {
    provide: APP_INITIALIZER, multi: true, deps: [AppInitService],
    useFactory: (appInitService: AppInitService) => () => appInitService.init()
  },
];
