import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { InvolveAsiaAuthService } from '../services/involve-asia-auth.service';
import { URLSearchParams } from 'url';

@Injectable()
export class ConversionsService {
  private readonly conversionsApiUrl: string;
  private readonly conversionsRangeApiUrl: string; // New URL for the range endpoint

  constructor(
    private httpService: HttpService,
    private readonly involveAsiaAuthService: InvolveAsiaAuthService,
  ) {
    this.conversionsApiUrl = 'https://api.involve.asia/api/conversions/all';
    this.conversionsRangeApiUrl = 'https://api.involve.asia/api/conversions/range';
  }

  // Existing method for the /conversions/all endpoint
  async getConversions(body: any = {}) {
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
      console.log('Received body for conversions:', body);
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

      console.log('Request body for conversions:', requestBody.toString());

      // Step 3: Make the API call to Involve Asia with the provided body.
      const response = await firstValueFrom(
        this.httpService.post(this.conversionsApiUrl, requestBody.toString(), { headers })
      );

      return response.data;
    } catch (error) {
      console.error('Error fetching conversions:', error.response?.data || error.message);
      throw new InternalServerErrorException('Failed to fetch conversion data from external API.');
    }
  }

  // New method for the /conversions/range endpoint
  async getConversionsByDateRange(body: any = {}) {
    try {
      const authResponse = await this.involveAsiaAuthService.authenticate();
      const token = authResponse.data.token;
      
      const headers = {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      
      const requestBody = new URLSearchParams();
      console.log('Received body for date range conversions:', body);
      for (const key in body) {
        if (Object.prototype.hasOwnProperty.call(body, key)) {
          if (typeof body[key] === 'object' && body[key] !== null) {
            for (const filterKey in body[key]) {
              if (Object.prototype.hasOwnProperty.call(body[key], filterKey)) {
                requestBody.append(`${filterKey}`, body[key][filterKey]);
              }
            }
          } else {
            requestBody.append(key, body[key]);
          }
        }
      }

      console.log('Request body for date range conversions:', requestBody.toString());
      
      const response = await firstValueFrom(
        this.httpService.post(this.conversionsRangeApiUrl, requestBody.toString(), { headers })
      );
      
      return response.data;
    } catch (error) {
      console.error('Error fetching date range conversions:', error.response?.data || error.message);
      throw new InternalServerErrorException('Failed to fetch conversion data from external API.');
    }
  }
}