import {
  Request,
  Body,
  Controller,
  UseGuards,
  Post,
  NotFoundException, Delete, Param,
} from '@nestjs/common';
import { ItemDto } from './dtos/item.dto';
import { CartService } from './cart.service';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/auth.decorator';
import { Role } from '../auth/enums/role.enum';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.User)
  @Post('/')
  async addItemToCart(@Request() req, @Body() itemDto: ItemDto) {
    const cart = await this.cartService.addItemToCart(req.user.userId, itemDto);
    return cart;
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.User)
  @Delete('/')
  async removeItemFromCart(@Request() req, @Body() { productId }) {
    const cart = await this.cartService.removeItemFromCart(
      req.user.userId,
      productId,
    );
    if (!cart) throw new NotFoundException('Cart item does not exists');
    return cart;
  }

  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.User)
  @Delete('/:id')
  async deleteCart(@Param('id') userId: string) {
    const cart = await this.cartService.deleteCart(userId);
    if (!cart) throw new NotFoundException('Cart does not exists');
    return cart;
  }
}
