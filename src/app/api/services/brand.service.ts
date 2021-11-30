import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {BrandDTO} from "../dto/BrandDTO";
import {GlobalService} from "./global.service";

@Injectable({
  providedIn: 'root'
})
export class BrandService extends BaseService {

  private baseUrl = '/brand';

  constructor(httpClient: HttpClient, global: GlobalService) {
    super(httpClient, global);
  }

  public async getAllBrands(): Promise<BrandDTO[]> {
    const url = `${this.baseUrl}`;
    const options = {
      responseType: 'json' as const
    };
    return (await this.restCall('GET', url, options));
  }

  public async getBrandById(id: string): Promise<BrandDTO> {
    const url = `${this.baseUrl}/${id}`;
    const options = {
      responseType: 'json' as const
    };
    return (await this.restCall('GET', url, options));
  }

  public async saveBrand(brand: BrandDTO): Promise<BrandDTO> {
    const url = `${this.baseUrl}`;
    const options = {
      body: brand,
      responseType: 'json' as const
    };
    return (await this.restCall('POST', url, options));
  }

  public async updateBrand(brand: BrandDTO, id: number): Promise<BrandDTO> {
    const url = `${this.baseUrl}/${id}`;
    const options = {
      body: brand,
      responseType: 'json' as const
    };
    return (await this.restCall('PUT', url, options));
  }

  public async deleteBrand(id: number): Promise<BrandDTO> {
    const url = `${this.baseUrl}/${id}`;
    return (await this.restCall('DELETE', url));
  }
}
