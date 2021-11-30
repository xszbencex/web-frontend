import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {GlobalService} from "./global.service";

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(
    protected http: HttpClient,
    private global: GlobalService
  ) { }

  protected async restCall(method: string, url: string, options?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let headers = {} as HttpHeaders;
      if (this.global.jwtToken) {
        headers = new HttpHeaders().set("Authorization", "Bearer " + this.global.jwtToken)
      }
      options = {
        ...options,
        headers
      };
      this.http.request<any>(method, `${environment.backendUrl}${url}`, options)
        .toPromise()
        .then((response: any) => resolve(response))
        .catch((error: HttpErrorResponse) => {
          if (error.status === 403) {
            this.global.messageDialog("Nincs joga a művelethez");
          }
          reject(error);
        });
    });
  }

}
