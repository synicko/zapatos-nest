import { Pool } from "pg";
import { ReadOnlyRepository, ReadWriteRepository } from "../repositories";

export interface Repositories {
  'shop.user': ReadWriteRepository<'shop.user'>;
  'shop.product': ReadWriteRepository<"shop.product">;
  'shop.order': ReadWriteRepository<"shop.order">;
  'shop.orderItem': ReadWriteRepository<'shop.orderItem'>;
  'shop.revenues': ReadOnlyRepository<'shop.revenues'>;
  'billing.invoice': ReadWriteRepository<'billing.invoice'>;
}

export const createRepositories: (pool: Pool) => Repositories = (pool: Pool) => ({
  'shop.user': new ReadWriteRepository<'shop.user'>(pool, 'shop.user'),
  'shop.product': new ReadWriteRepository<"shop.product">(pool, 'shop.product'),
  'shop.order': new ReadWriteRepository<"shop.order">(pool, 'shop.order'),
  'shop.orderItem': new ReadWriteRepository<'shop.orderItem'>(pool, 'shop.orderItem'),
  'shop.revenues': new ReadOnlyRepository<'shop.revenues'>(pool, 'shop.revenues'),
  'billing.invoice': new ReadWriteRepository<'billing.invoice'>(pool, 'billing.invoice'),
});
