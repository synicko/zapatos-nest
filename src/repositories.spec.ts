import { config } from 'dotenv';
import { exec } from 'child_process';
import { join } from 'path';
import { promisify } from 'util';
import { ZapatosService as zs } from './zapatos/zapatos.service';
import { Repository } from './repositories';
import { SQLFragment, parent, conditions, sql } from 'zapatos/db';
import {
  InvoiceInsert,
  OrderJson,
  OrderUpdate,
  UserInsert,
  UserJson,
} from './dto';

const execProcess = promisify(exec);

config();

describe('Repositories for zapatos DB', () => {
  beforeAll(async () => {
    zs.init({
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
    });
    await execProcess(
      `psql -d zapatos -f ${join(__dirname, '..', 'scripts/seed.sql')}`,
    );
  });

  //static
  describe('Static Repository', () => {
    // fragment
    it('should return an SQLFragment', () => {
      const query = Repository.fragment<'shop.product'>(
        'shop.product',
        { id: 1 },
        { columns: ['description'] },
      );
      expect(query).toBeInstanceOf(SQLFragment);
    });
    it('should also return an SQLFragment', () => {
      const query = Repository.aggFragment<'shop.product'>(
        'shop.product',
        'count',
      );
      expect(query).toBeInstanceOf(SQLFragment);
    });
    // rawExecute
    it('should return results in the indicated type', async () => {
      const result = await Repository.rawExecute<number>('SELECT RANDOM()');
      expect(typeof result).toBe('number');

      const results = await Repository.rawExecute<number>(
        'SELECT RANDOM() AS result FROM generate_series(1, 5)',
      );
      expect(results).toBeInstanceOf(Array<number>);
    });
    it('should be able to extract results with a certain name', async () => {
      const result = await Repository.rawExecute<boolean>(
        'SELECT true AS test',
        'test',
      );
      expect(typeof result).toBe('boolean');
      expect(result).toBe(true);

      const results = await Repository.rawExecute<boolean>(
        'SELECT RANDOM() AS test FROM generate_series(1, 5)',
        'test',
      );
      expect(results).toBeInstanceOf(Array<number>);
      if (Array.isArray(results)) expect(results.length).toBe(5);
      else fail('results should have been an array');
    });
  });

  describe('Instantiated Repository', () => {
    // fetch all users
    it('should fetch all users', async () => {
      const users = await zs.repos['shop.user'].select();
      expect(users.length).toBe(3);
    });
    // fetch all users with nested orders
    it('should fetch all users with their orders', async () => {
      type UserOrderSelectable = UserJson & {
        orders: OrderJson[];
      };
      const users = await zs.repos['shop.user'].select<UserOrderSelectable>(
        undefined,
        {
          lateral: {
            orders: Repository.fragment<'shop.order'>('shop.order', {
              userId: parent('id'),
            }),
          },
        },
      );
      expect(users.length).toBe(3);
      for (const user of users) {
        expect(user).toHaveProperty('orders');
        expect(user.orders).toBeInstanceOf(Array<OrderJson>);
      }
    });

    // fetch some users
    it('should return a selection of users', async () => {
      const users = await zs.repos['shop.user'].select(sql`id >= 2`);
      expect(users.length).toBe(2);
    });
    it('should also return a selection of users', async () => {
      const users = await zs.repos['shop.user'].select({
        id: conditions.lte(2),
      });
      expect(users.length).toBe(2);
    });

    // fetch a single user
    it('should return one user', async () => {
      const user = await zs.repos['shop.user'].selectOne({ id: 2 });
      expect(user).toBeDefined();
      if (user) expect(user.firstName).toBe('Vanina');
    });

    // fetch count
    it('should return the number of users', async () => {
      const nb = await zs.repos['shop.user'].count();
      expect(nb).toBe(3);
    });

    // fetch sum
    it("should return the sum of users' ids", async () => {
      const sum = await zs.repos['shop.user'].sum(null, { columns: ['id'] });
      expect(sum).toBe(6);
    });

    // fetch avg
    it("should return the avg of users' ids", async () => {
      const avg = await zs.repos['shop.user'].avg(null, { columns: ['id'] });
      expect(avg).toBe(2);
    });

    // fetch min
    it("should return the min of users' ids", async () => {
      const min = await zs.repos['shop.user'].min(null, { columns: ['id'] });
      expect(min).toBe(1);
    });

    // fetch max
    it("should return the max of users' ids", async () => {
      const max = await zs.repos['shop.user'].max(null, { columns: ['id'] });
      expect(max).toBe(3);
    });

    // insert new
    it('should create and return a new user', async () => {
      const newUser = new UserInsert({
        firstName: 'Carole',
        lastName: 'Gohier',
      });
      const user = await zs.repos['shop.user'].insert(newUser);
      expect(user).toBeDefined();
      expect(user).toHaveProperty('id');
    });

    // upsert existing
    it('should update an existing invoice with upsert', async () => {
      const invoiceToUpdate = new InvoiceInsert({
        orderId: 5,
        paidAt: new Date(),
      });
      const updated = await zs.repos['billing.invoice'].upsert(
        invoiceToUpdate,
        ['orderId'],
      );
      if (updated) {
        expect(updated.orderId).toBe(5);
        expect(updated['$action']).toBe('UPDATE');
      }
    });

    // upsert new
    it('should add a new invoice with upsert', async () => {
      await zs.repos['shop.order'].insert({ userId: 3 });
      const invoiceToAdd = new InvoiceInsert({
        orderId: 6,
      });
      const added = await zs.repos['billing.invoice'].upsert(invoiceToAdd, [
        'orderId',
      ]);
      if (added) {
        expect(added.orderId).toBe(6);
        expect(added['$action']).toBe('INSERT');
      }
    });

    // update
    it('should update an existing order', async () => {
      const id = 6;
      const update = new OrderUpdate({
        userId: 1,
      });
      const updated = await zs.repos['shop.order'].update(update, { id });
      expect(updated.length).toBe(1);
      expect(updated[0].userId).toBe(1);
    });

    // delete
    it('should delete the designated recs', async () => {
      await zs.repos['billing.invoice'].delete({ orderId: 6 });
      const nbInvoices = await zs.repos['billing.invoice'].count();
      expect(nbInvoices).toBe(5);
      await zs.repos['shop.order'].delete({ id: 6 });
      const nbOrders = await zs.repos['billing.invoice'].count();
      expect(nbOrders).toBe(5);
    });

    // truncate

    it('should throw an error when no id and/or foreign key params are provided', async () => {
      expect(
        async () => await zs.repos['shop.orderItem'].truncate(),
      ).rejects.toThrow(Error);
      expect(
        async () => await Repository.truncate(['shop.user', 'shop.product']),
      ).rejects.toThrow(Error);
    });

    it('should remove all records from listed tables', async () => {
      await zs.repos['shop.orderItem'].truncate('RESTART IDENTITY');
      const nbOrderItem = await zs.repos['shop.orderItem'].count();
      expect(nbOrderItem).toBe(0);

      await zs.repos['shop.order'].truncate(null, 'CASCADE');
      const nbOrder = await zs.repos['shop.order'].count();
      const nbInvoice = await zs.repos['billing.invoice'].count();
      expect(nbOrder).toBe(0);
      expect(nbInvoice).toBe(0);

      await Repository.truncate(
        ['shop.user', 'shop.product'],
        'RESTART IDENTITY',
        'CASCADE',
      );
      const nbUser = await zs.repos['shop.user'].count();
      const nbProduct = await zs.repos['shop.product'].count();
      expect(nbUser).toBe(0);
      expect(nbProduct).toBe(0);
    });
  });

  afterAll(() => {
    zs.close();
  });
});
