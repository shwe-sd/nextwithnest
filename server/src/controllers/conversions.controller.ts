import { Controller, Res, HttpStatus, UseGuards, Get, Query, Post, Body } from '@nestjs/common';
import { ConversionsService } from '../services/conversions.service';
import { JwtAuthGuard } from '../guards/jwt.auth.guard';
import { ConversionReportDto } from '../dtos/conversion-report.dto';

@Controller('conversions')
export class ConversionsController {
  constructor(private readonly conversionsService: ConversionsService) {}

  // Existing GET endpoint for conversions/all
  @UseGuards(JwtAuthGuard)
  @Get('all') // The fix: added 'all' to the path decorator
  async getConversions(
    @Res() res,
    @Query() query: ConversionReportDto,
  ) {
    const filters = { ...query.filters };

    // Support both flat and nested filters
    if (query.conversion_id) filters.conversion_id = query.conversion_id;
    if (query.offer_id) filters.offer_id = query.offer_id;
    if (query.offer_name) filters.offer_name = query.offer_name;
    if (query.conversion_status) filters.conversion_status = query.conversion_status;
    if (query.preferred_currency) filters.preferred_currency = query.preferred_currency;

    const requestBody: any = {
      page: query.page || '1',
      limit: query.limit || '100',
    };

    if (Object.keys(filters).length > 0) {
      requestBody.filters = filters;
    }

    const conversions = await this.conversionsService.getConversions(requestBody);
    res.status(HttpStatus.OK).json(conversions);
  }

  // New GET endpoint for conversions/range, now using URL queries
  @UseGuards(JwtAuthGuard)
  @Get('range')
  async getConversionsByDateRange(
    @Res() res,
    @Query() query: ConversionReportDto, // Changed from @Body() to @Query()
  ) {
    const conversions = await this.conversionsService.getConversionsByDateRange(query);
    res.status(HttpStatus.OK).json(conversions);
  }
}