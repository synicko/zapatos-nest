import { TimestampTzString } from 'zapatos/db';
import { billing } from 'zapatos/schema';

export class InvoiceSelect implements billing.invoice.Selectable {
  id!: number;
  orderId!: number;
  createdAt!: Date;
  paidAt!: Date | null;

  constructor(data: billing.invoice.Selectable) {
    Object.assign(this, data);
  }
}

export class InvoiceJson implements billing.invoice.JSONSelectable {
  id!: number;
  orderId!: number;
  createdAt!: TimestampTzString;
  paidAt!: TimestampTzString | null;

  constructor(data: billing.invoice.JSONSelectable) {
    Object.assign(this, data);
  }
}

export class InvoiceWhere implements billing.invoice.Whereable {
  constructor(data: billing.invoice.Whereable) {
    Object.assign(this, data);
  }
}

export class InvoiceInsert implements billing.invoice.Insertable {
  orderId!: number;
  createdAt!: Date;
  paidAt?: Date | null;

  constructor(data: billing.invoice.Insertable) {
    Object.assign(this, data);
  }
}

export class InvoiceUpdate implements billing.invoice.Updatable {
  constructor(data: billing.invoice.Updatable) {
    Object.assign(this, data);
  }
}
