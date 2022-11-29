import { shop } from 'zapatos/schema';

export class RevenuesSelect implements shop.revenues.Selectable {
  id!: number | null;
  customer!: string | null;
  products!: string[] | null;
  total!: number | null;

  constructor(data: shop.revenues.Selectable) {
    Object.assign(this, data);
  }
}

export class RevenuesJson implements shop.revenues.JSONSelectable {
  id!: number | null;
  customer!: string | null;
  products!: string[] | null;
  total!: number | null;

  constructor(data: shop.revenues.JSONSelectable) {
    Object.assign(this, data);
  }
}
