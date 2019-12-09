import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { AppService } from './app.service';
import { OperationDto } from './models/OperationDto';
import { Site } from './models/Site';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('items')
  async findAll(): Promise<Site[]> {
    return this.appService.findAllSites();
  }

  @Get('item/:id')
  async findById(@Param('id') id): Promise<Site> {
    return this.appService.findSiteById(id);
  }

  @Patch('items')
  async markAllAsRead(): Promise<OperationDto> {
    return this.appService.markAllAsReaded();
  }

  @Put('item')
  async updateSite(@Body() site: Site): Promise<OperationDto> {
    return this.appService.updateSite(site);
  }

  @Post('item')
  async insertSite(@Body() site: Site): Promise<OperationDto> {
    return this.appService.insertSite(site);
  }

  @Delete('item/:id')
  async deleteSite(@Param('id') id): Promise<OperationDto> {
    return this.appService.deleteSite(id);
  }
}
