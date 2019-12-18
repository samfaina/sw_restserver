import { Injectable } from '@nestjs/common';
import { Transport } from '@nestjs/common/enums/transport.enum';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { OperationDto } from 'src/models/OperationDto';
import { Site } from 'src/models/Site';
import { EventsGateway } from '../events/events.gateway';

@Injectable()
export class DatabaseService {
  private client: ClientProxy;

  constructor(private readonly events: EventsGateway) {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8876,
      },
    });

    this.events.token$.subscribe(() => this.emitSites(null));
  }

  async findAllSites(): Promise<Site[]> {
    return this.client.send<Site[], any>('findAll', []).toPromise();
  }

  async updateSite(site: Site): Promise<OperationDto> {
    return this.emitSites(
      this.client.send<OperationDto, Site>('updateSite', site).toPromise(),
    );
  }

  async markAllAsReaded(): Promise<OperationDto> {
    return this.emitSites(
      this.client.send<OperationDto, any>('markAsRead', []).toPromise(),
    );
  }

  async insertSite(site): Promise<OperationDto> {
    return this.emitSites(
      this.client.send<OperationDto, Site>('insertSite', site).toPromise(),
    );
  }

  async findSiteById(id: number | string): Promise<Site> {
    return this.emitSites(
      this.client.send<Site, number | string>('findById', id).toPromise(),
    );
  }

  async deleteSite(id: number | string): Promise<OperationDto> {
    return this.emitSites(
      this.client
        .send<OperationDto, number | string>('deleteSite', id)
        .toPromise(),
    );
  }

  private async emitSites(result: Promise<any>): Promise<any> {
    const sites = await this.client
      .send<Site[], any>('findAll', [])
      .toPromise();

    this.events.server.emit('sites', sites);
    return result;
  }
}
