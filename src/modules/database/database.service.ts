import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
import { SocketClientFactory } from 'src/utils/socket-client-factory/socket-client.factory';
import { EventsGateway } from '../events/events.gateway';

export type Site = any;
export type OperationDto = any;

@Injectable()
export class DatabaseService {
  private client: ClientProxy;

  constructor(
    private readonly events: EventsGateway,
    private readonly socketFactory: SocketClientFactory,
  ) {
    this.client = ClientProxyFactory.create(
      this.socketFactory.createDBClient(),
    );

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
