import { JSONValue } from 'zapatos/db';
import { shop } from 'zapatos/schema';

export class ProductSelect implements shop.product.Selectable {
  id!: number;
  description!: string;
  price!: number;
  attributes!: JSONValue;

  constructor(data: shop.product.Selectable) {
    Object.assign(this, data);
  }
}

export class ProductJson implements shop.product.JSONSelectable {
  id!: number;
  description!: string;
  price!: number;
  attributes!: JSONValue;

  constructor(data: shop.product.JSONSelectable) {
    Object.assign(this, data);
  }
}

export class ProductWhere implements shop.product.Whereable {
  constructor(data: shop.product.Whereable) {
    Object.assign(this, data);
  }
}

export class ProductInsert implements shop.product.Insertable {
  description!: string;
  price!: number;
  attributes?: JSONValue;

  constructor(data: shop.product.Insertable) {
    Object.assign(this, data);
  }
}

export class ProductUpdate implements shop.product.Updatable {
  constructor(data: shop.product.Updatable) {
    Object.assign(this, data);
  }
}
