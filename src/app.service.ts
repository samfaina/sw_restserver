import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { OperationDto } from './models/OperationDto';
import { Site } from './models/Site';

@Injectable()
export class AppService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8876,
      },
    });
  }

  async findAllSites(): Promise<Site[]> {
    return this.client.send<Site[], any>('findAll', []).toPromise();
  }

  async updateSite(site: Site): Promise<OperationDto> {
    return this.client.send<OperationDto, Site>('updateSite', site).toPromise();
  }

  async markAllAsReaded(): Promise<OperationDto> {
    return this.client.send<OperationDto, any>('markAsRead', []).toPromise();
  }

  async insertSite(site): Promise<OperationDto> {
    return this.client.send<OperationDto, Site>('insertSite', site).toPromise();
  }

  async findSiteById(id: number | string): Promise<Site> {
    return this.client.send<Site, number | string>('findById', id).toPromise();
  }

  async deleteSite(id: number | string): Promise<OperationDto> {
    return this.client
      .send<OperationDto, number | string>('deleteSite', id)
      .toPromise();
  }
}
