import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BaseService} from "./base.service";
import {MonitorDTO} from "../dto/MonitorDTO";
import {GlobalService} from "./global.service";

@Injectable({
  providedIn: 'root'
})
export class MonitorService extends BaseService {

  private baseUrl = '/monitor';

  constructor(httpClient: HttpClient, global: GlobalService) {
    super(httpClient, global);
  }

  public async getAllMonitors(): Promise<MonitorDTO[]> {
    const url = `${this.baseUrl}`;
    const options = {
      responseType: 'json' as const
    };
    return (await this.restCall('GET', url, options));
  }

  public async getMonitorById(id: string): Promise<MonitorDTO> {
    const url = `${this.baseUrl}/${id}`;
    const options = {
      responseType: 'json' as const
    };
    return (await this.restCall('GET', url, options));
  }

  public async saveMonitor(monitor: MonitorDTO): Promise<MonitorDTO> {
    const url = `${this.baseUrl}`;
    const options = {
      body: monitor,
      responseType: 'json' as const
    };
    return (await this.restCall('POST', url, options));
  }

  public async updateMonitor(monitor: MonitorDTO, id: number): Promise<MonitorDTO> {
    const url = `${this.baseUrl}/${id}`;
    const options = {
      body: monitor,
      responseType: 'json' as const
    };
    return (await this.restCall('PUT', url, options));
  }

  public async deleteMonitor(id: number): Promise<MonitorDTO> {
    const url = `${this.baseUrl}/${id}`;
    const options = {
      responseType: 'json' as const
    };
    return (await this.restCall('DELETE', url, options));
  }
}
