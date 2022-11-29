import { TimestampTzString } from 'zapatos/db';
import { shop } from 'zapatos/schema';

export class OrderSelect implements shop.order.Selectable {
  id!: number;
  createdAt!: Date;
  userId!: number;

  constructor(data: shop.order.Selectable) {
    Object.assign(this, data);
  }
}

export class OrderJson implements shop.order.JSONSelectable {
  id!: number;
  createdAt!: TimestampTzString;
  userId!: number;

  constructor(data: shop.order.JSONSelectable) {
    Object.assign(this, data);
  }
}

export class OrderWhere implements shop.order.Whereable {
  constructor(data: shop.order.Whereable) {
    Object.assign(this, data);
  }
}

export class OrderInsert implements shop.order.Insertable {
  createdAt!: Date;
  userId!: number;

  constructor(data: shop.order.Insertable) {
    Object.assign(this, data);
  }
}

export class OrderUpdate implements shop.order.Updatable {
  constructor(data: shop.order.Updatable) {
    Object.assign(this, data);
  }
}
