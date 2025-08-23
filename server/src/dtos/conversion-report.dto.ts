import { IsOptional, IsString } from 'class-validator';

// This DTO defines the expected query parameters for the conversion report.
export class ConversionReportDto {
  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  limit?: string;

  @IsOptional()
  @IsString()
  conversion_id?: string;

  @IsOptional()
  @IsString()
  offer_id?: string;

  @IsOptional()
  @IsString()
  start_date?: string;

  @IsOptional()
  @IsString()
  end_date?: string;

  @IsOptional()
  @IsString()
  offer_name?: string;

  @IsOptional()
  @IsString()
  conversion_status?: string;

  @IsOptional()
  @IsString()
  preferred_currency?: string;

  @IsOptional()
  filters?: {
    conversion_id?: string;
    offer_id?: string;
    offer_name?: string;
    conversion_status?: string;
    preferred_currency?: string;
  };
}