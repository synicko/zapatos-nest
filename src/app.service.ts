import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import { join } from 'path';
import { promisify } from 'util';
import { sql, parent } from 'zapatos/db';
import {
  InvoiceInsert,
  InvoiceUpdate,
  OrderInsert,
  OrderItemJson,
  OrderJson,
  UserInsert,
} from './dto';
import { Repository } from './repositories';
import { ZapatosService as zs } from './zapatos/zapatos.service';

const execProcess = promisify(exec);

type OrderWithItems = OrderJson & { items: OrderItemJson[] };
type RevenuesPerUser = { name: string; total: number };

@Injectable()
export class AppService {
  private readonly dataSource;

  async populate(): Promise<void> {
    execProcess(
      `PGUSER=${process.env.POSTGRES_USER} 
      PGPASSWORD=${process.env.POSTGRES_PASSWORD} 
      psql -d ${process.env.POSTGRES_DATABASE} -f ${join(
        __dirname,
        '..',
        'scripts/seed.sql',
      )}`,
    );
  }

  async clean(): Promise<void> {
    await Repository.truncate(
      [
        'billing.invoice',
        'shop.order',
        'shop.orderItem',
        'shop.product',
        'shop.user',
      ],
      'RESTART IDENTITY',
      'CASCADE',
    );
  }

  async addUser(data: UserInsert) {
    return zs.repos['shop.user'].insert(data);
  }

  async addOrder(data: OrderInsert) {
    return zs.repos['shop.order'].insert(data);
  }

  async addInvoice(data: InvoiceInsert) {
    return zs.repos['billing.invoice'].insert(data);
  }

  async orderWithItems(orderId: number): Promise<OrderWithItems> {
    return zs.repos['shop.order'].selectOne<OrderWithItems>(
      { id: orderId },
      {
        lateral: {
          items: zs.repos['shop.orderItem'].fragment({
            // ou  Repository.fragment<'shop.orderItem'>('shop.orderItem', {
            orderId /* ou orderId: parent('id')*/,
          }),
        },
      },
    );
  }

  async revenues(orderId?: number) {
    if (orderId) return zs.repos['shop.revenues'].select({ id: orderId });
    return zs.repos['shop.revenues'].select();
  }

  async revenuesPerUser(): Promise<RevenuesPerUser[]> {
    return zs.repos['shop.user'].select<RevenuesPerUser>(null, {
      columns: [],
      extras: {
        name: sql`first_name || ' ' || last_name`,
      },
      lateral: {
        total: sql`SELECT shop.revenues_for_customer(${parent(
          'id',
        )}) AS result`,
      },
    });
  }

  async updateInvoice(id: number, data: InvoiceUpdate) {
    return zs.repos['billing.invoice'].update(data, { id });
  }
}
