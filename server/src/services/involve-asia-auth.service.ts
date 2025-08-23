import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { URLSearchParams } from 'url';

@Injectable()
export class InvolveAsiaAuthService {
  private readonly apiKey: string;
  private readonly apiSecret: string;
  private readonly apiUrl: string;

  constructor(private httpService: HttpService) {
    this.apiKey = process.env.INVOLVE_ASIA_API_KEY ?? '';
    this.apiSecret = process.env.INVOLVE_ASIA_API_SECRET ?? '';
    this.apiUrl = 'https://api.involve.asia/api/authenticate';
  }

  async authenticate() {
    try {
      const authData = new URLSearchParams();
      authData.append('key', this.apiKey);
      authData.append('secret', this.apiSecret);

      const response = await firstValueFrom(
        this.httpService.post(
          this.apiUrl,
          authData.toString(),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json',
            },
          }
        )
      );
      console.log('Involve Asia API authentication successful:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error authenticating with Involve Asia API:', error.response?.data || error.message);
      throw new InternalServerErrorException('Failed to authenticate with external API.');
    }
  }
}