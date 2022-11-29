import { shop } from 'zapatos/schema';

export class OrderItemSelect implements shop.orderItem.Selectable {
  id!: number;
  quantity!: number;
  orderId!: number;
  productId!: number;

  constructor(data: shop.orderItem.Selectable) {
    Object.assign(this, data);
  }
}

export class OrderItemJson implements shop.orderItem.JSONSelectable {
  id!: number;
  quantity!: number;
  orderId!: number;
  productId!: number;

  constructor(data: shop.orderItem.JSONSelectable) {
    Object.assign(this, data);
  }
}

export class OrderItemWhere implements shop.orderItem.Whereable {
  constructor(data: shop.orderItem.Whereable) {
    Object.assign(this, data);
  }
}

export class OrderItemInsert implements shop.orderItem.Insertable {
  quantity!: number;
  orderId!: number;
  productId!: number;

  constructor(data: shop.orderItem.Insertable) {
    Object.assign(this, data);
  }
}

export class OrderItemUpdate implements shop.orderItem.Updatable {
  constructor(data: shop.orderItem.Updatable) {
    Object.assign(this, data);
  }
}
