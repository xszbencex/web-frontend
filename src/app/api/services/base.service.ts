import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(
    protected http: HttpClient
  ) { }

  protected async restCall(method: string, url: string, options?: any): Promise<any> {
    options = {
      ...options,
      responseType: 'json' as const
    };
    return new Promise((resolve, reject) => {
      this.http.request<any>(method, `${environment.backendUrl}${url}`, options)
        .toPromise()
        .then((response: any) => resolve(response))
        .catch(error => reject(error));
    });
  }

}
