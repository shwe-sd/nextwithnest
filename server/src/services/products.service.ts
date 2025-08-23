import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InvolveAsiaAuthService } from './involve-asia-auth.service';
import { URLSearchParams } from 'url';

@Injectable()
export class ProductsService {
  private readonly apiUrl: string;

  constructor(
    private httpService: HttpService,
    private readonly involveAsiaAuthService: InvolveAsiaAuthService,
  ) {
    this.apiUrl = 'https://api.involve.asia/api/shopeextra/all';
  }

  async getShopeeProducts(body: any = {}) {
    try {
      // Step 1: Get the authentication token from the InvolveAsiaAuthService
      const authResponse = await this.involveAsiaAuthService.authenticate();
      const token = authResponse.data.token;

      // Step 2: Set the headers with the Bearer token
      const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      
      const requestBody = new URLSearchParams();
      // Dynamically append all key-value pairs from the user-provided body
      console.log('Received body for Shopee products:', body);
      for (const key in body) {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
          // If the value is an object (like 'filters'), stringify it
          if (typeof body[key] === 'object' && body[key] !== null) {
            for (const filterKey in body[key]) {
              if (Object.prototype.hasOwnProperty.call(body[key], filterKey)) {
                requestBody.append(`filters[${filterKey}]`, body[key][filterKey]);
              }
            }
          } else {
            requestBody.append(key, body[key]);
          }
        }
      }

      console.log('Request body for Shopee products:', requestBody.toString());

      // Step 3: Make the API call to Involve Asia with the provided body.
      const response = await firstValueFrom(
        this.httpService.post(this.apiUrl, requestBody.toString(), { headers })
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching Shopee products:', error.response?.data || error.message);
      throw new InternalServerErrorException('Failed to fetch product data from external API.');
    }
  }
}