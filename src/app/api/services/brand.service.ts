import { Injectable } from '@angular/core';
import {BaseService} from "./base.service";
import {HttpClient} from "@angular/common/http";
import {BrandDTO} from "../dto/BrandDTO";

@Injectable({
  providedIn: 'root'
})
export class BrandService extends BaseService {

  private baseUrl = '/brand';

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public async getAllBrands(): Promise<BrandDTO[]> {
    const url = `${this.baseUrl}`;
    return (await this.restCall('GET', url));
  }

  public async getBrandById(id: string): Promise<BrandDTO> {
    const url = `${this.baseUrl}/${id}`;
    return (await this.restCall('GET', url));
  }

  public async saveBrand(brand: BrandDTO): Promise<BrandDTO> {
    const url = `${this.baseUrl}`;
    const options = {
      body: brand
    };
    return (await this.restCall('POST', url, options));
  }

  public async updateBrand(brand: BrandDTO, id: number): Promise<BrandDTO> {
    const url = `${this.baseUrl}/${id}`;
    const options = {
      body: brand
    };
    return (await this.restCall('PUT', url, options));
  }

  public async deleteBrand(id: number): Promise<BrandDTO> {
    const url = `${this.baseUrl}/${id}`;
    return (await this.restCall('DELETE', url));
  }
}
