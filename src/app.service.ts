import { Injectable, Logger } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { OperationDto } from './models/OperationDTO';
import { Site } from './models/Site';

// TODO: LOGGER
@Injectable()
export class AppService {
  private logger = new Logger('AppService');
  private client: ClientProxy;

  constructor() {
    // this.pushClient = ClientProxyFactory.create({
    //   transport: Transport.TCP,
    //   options: {
    //     host: '127.0.0.1',
    //     port: 8877,
    //   },
    // });
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
    // let conn: PoolConnection;
    // return new Promise(async (resolve, reject) => {
    //   try {
    //     conn = await this.pool.getConnection();
    //     const rows = await conn.query(SELECT_ALL_SORTED);
    //     if (rows) {
    //       const _rows = rows.map(row => new Site(row));
    //       this.logger.log(`Founded ${_rows.length} site`);
    //       resolve(_rows);
    //     }

    //     // console.log(rows); //[ {val: 1}, meta: ... ]
    //     // const res = await conn.query("INSERT INTO myTable value (?, ?)", [1, "mariadb"]);
    //     // console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
    //   } catch (err) {
    //     console.log('​getSites err', err);
    //     this.logger.error('Find All Sites Error', err);
    //     // throw err;
    //     reject(err);
    //   } finally {
    //     if (conn) return conn.end();
    //   }
    // });
  }

  async updateSite(site: Site): Promise<OperationDto> {
    return this.client.send<OperationDto, Site>('updateSite', site).toPromise();
    // let conn: PoolConnection;
    // return new Promise(async (resolve, reject) => {
    //   try {
    //     conn = await this.pool.getConnection();
    //     const res = await conn.query(UPDATE_SITE, [
    //       site.last_update,
    //       site.chapter_count,
    //       site.chapter_date,
    //       site.watched ? 1 : 0,
    //       site.chapter_last_read,
    //       site.chapter_last_published,
    //       site.status,
    //       site.id,
    //     ]);
    //     this.logger.log(`Site updated: ${site.name}`);
    //     await this.client.send<string, string>('push', site.name).toPromise();
    //     // console.log('​updateSite -> res', site);
    //     resolve(res);
    //   } catch (err) {
    //     this.logger.error('Error updating site: ', err);
    //     // console.log('​updateSite err', err);
    //     // throw err;
    //     reject(err);
    //   } finally {
    //     if (conn) return conn.end();
    //   }
    // });
  }

  async markAllAsReaded(): Promise<OperationDto> {
    return this.client.send<OperationDto, any>('markAsRead', []).toPromise();
    // let conn: PoolConnection;
    // return new Promise(async (resolve, reject) => {
    //   try {
    //     conn = await this.pool.getConnection();
    //     const res = await conn.query(MARK_ALL_AS_READED);
    //     console.log('​markAsReaded -> res', res);
    //     resolve(res);
    //   } catch (err) {
    //     console.log('​markAsReaded err', err);
    //     // throw err;
    //     reject(err);
    //   } finally {
    //     if (conn) return conn.end();
    //   }
    // });
  }

  async insertSite(site): Promise<OperationDto> {
    return this.client.send<OperationDto, Site>('insertSite', site).toPromise();
    // let conn;
    // return new Promise(async (resolve, reject) => {
    //   try {
    //     conn = await this.pool.getConnection();
    //     const res = await conn.query(INSERT_SITE, [site.url, site.name]);
    //     console.log('insertSite -> res', res);
    //     resolve(res);
    //   } catch (err) {
    //     console.log('insertSite err', err);
    //     // throw err;
    //     reject(err);
    //   } finally {
    //     if (conn) return conn.end();
    //   }
    // });
  }

  async findSiteById(id: number | string): Promise<Site> {
    return this.client.send<Site, number | string>('findById', id).toPromise();
    // let conn: PoolConnection;
    // return new Promise(async (resolve, reject) => {
    //   try {
    //     conn = await this.pool.getConnection();
    //     const rows = await conn.query(SELECT_BY_ID, id);
    //     if (rows) {
    //       const _rows = rows.map(row => new Site(row));
    //       resolve(_rows[0]);
    //     }
    //   } catch (err) {
    //     console.log('getSiteById err', err);
    //     // throw err;
    //     reject(err);
    //   } finally {
    //     if (conn) return conn.end();
    //   }
    // });
  }

  async deleteSite(id: number | string): Promise<OperationDto> {
    return this.client
      .send<OperationDto, number | string>('deleteSite', id)
      .toPromise();
    // let conn: PoolConnection;
    // return new Promise(async (resolve, reject) => {
    //   try {
    //     conn = await this.pool.getConnection();
    //     const response = await conn.query(DELETE_BY_ID, id);
    //     console.log('deleteSite -> response', response);
    //     resolve(response);
    //   } catch (err) {
    //     console.log('deleteSite err', err);
    //     // throw err;
    //     reject(err);
    //   } finally {
    //     if (conn) return conn.end();
    //   }
    // });
  }
}
