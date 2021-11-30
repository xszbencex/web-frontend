import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {UserDTO} from "../dto/UserDTO";
import {GlobalService} from "./global.service";
import {UserResponseDTO} from "../dto/UserResponseDTO";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {

  private baseUrl = '/user';

  constructor(httpClient: HttpClient, global: GlobalService) {
    super(httpClient, global);
  }

  public async signIn(username: string, password: string): Promise<string> {
    const url = `${this.baseUrl}/signIn`;
    const options = {
      params: new HttpParams()
        .set("username", username)
        .set("password", password),
      responseType: 'text' as const
    }
    return (await this.restCall('POST', url, options));
  }

  public async signUp(user: UserDTO): Promise<string> {
    const url = `${this.baseUrl}/signUp`;
    const options = {
      body: user,
      responseType: 'text' as const
    }
    return (await this.restCall('POST', url, options));
  }

  public async getUserInfo(): Promise<UserResponseDTO> {
    const url = `${this.baseUrl}/info`;
    const options = {
      responseType: 'json' as const
    }
    return (await this.restCall('GET', url, options));
  }
}
