import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { OperationDto } from './models/OperationDto';
import { Site } from './models/Site';
import { AuthService } from './modules/auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Body() user) {
    return this.authService.login(user);
  }

  @Get('')
  testApi() {
    return 'Yujuu!';
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('items')
  async findAll(): Promise<Site[]> {
    return this.appService.findAllSites();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('item/:id')
  async findById(@Param('id') id): Promise<Site> {
    return this.appService.findSiteById(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch('items')
  async markAllAsRead(): Promise<OperationDto> {
    return this.appService.markAllAsReaded();
  }

  @UseGuards(AuthGuard('jwt'))
  @Put('item')
  async updateSite(@Body() site: Site): Promise<OperationDto> {
    return this.appService.updateSite(site);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('item')
  async insertSite(@Body() site: Site): Promise<OperationDto> {
    return this.appService.insertSite(site);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('item/:id')
  async deleteSite(@Param('id') id): Promise<OperationDto> {
    return this.appService.deleteSite(id);
  }
}
