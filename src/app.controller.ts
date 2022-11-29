import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { InvoiceUpdate } from './dto';
import { OrderInsert } from './dto/order.dto';
import { UserInsert } from './dto/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/populate')
  async populate(): Promise<void> {
    return this.appService.populate();
  }

  @Get('/clean')
  async clean(): Promise<void> {
    return this.appService.clean();
  }

  @Post('/add-user')
  async addUser(@Body() body: UserInsert) {
    return this.appService.addUser(body);
  }

  @Post('/add-order')
  async addOrder(@Body() body: OrderInsert) {
    return this.appService.addOrder(body);
  }

  @Get('/order-with-items/:orderId')
  async orderWithItems(@Param('orderId') orderId: number) {
    return this.appService.orderWithItems(orderId);
  }

  @Get('/revenues')
  async revenues() {
    return this.appService.revenues();
  }

  @Get('/revenues/:orderId')
  async revenuesByOrder(@Param('orderId') orderId: number) {
    return this.appService.revenues(orderId);
  }

  @Get('/revenues-per-user')
  async revenuesPerUser() {
    return this.appService.revenuesPerUser();
  }

  @Post('/update-invoice/:id')
  async updateInvoice(@Param('id') id: number, @Body() body: InvoiceUpdate) {
    return this.appService.updateInvoice(id, body);
  }
}
