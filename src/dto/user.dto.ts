import { PgColor } from 'zapatos/custom';
import { shop } from 'zapatos/schema';

export class UserSelect implements shop.user.Selectable {
  id!: number;
  firstName!: string;
  lastName!: string;
  favoriteColor: PgColor;

  constructor(data: shop.user.Selectable) {
    Object.assign(this, data);
  }
}

export class UserJson implements shop.user.JSONSelectable {
  id!: number;
  firstName!: string;
  lastName!: string;
  favoriteColor: PgColor;

  constructor(data: shop.user.JSONSelectable) {
    Object.assign(this, data);
  }
}

export class UserWhere implements shop.user.Whereable {
  constructor(data: shop.user.Whereable) {
    Object.assign(this, data);
  }
}

export class UserInsert implements shop.user.Insertable {
  firstName!: string;
  lastName!: string;
  favoriteColor?: PgColor;

  constructor(data: shop.user.Insertable) {
    Object.assign(this, data);
  }
}

export class UserUpdate implements shop.user.Updatable {
  constructor(data: shop.user.Updatable) {
    Object.assign(this, data);
  }
}
